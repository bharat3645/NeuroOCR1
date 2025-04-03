import * as tf from '@tensorflow/tfjs';

export class ModelService {
  private static instance: ModelService;
  private tfModel: tf.LayersModel | null = null;
  private tfModelLoaded: boolean = false;

  private constructor() {
    this.initializeModel();
  }

  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  private async initializeModel() {
    try {
      // Load the handwriting model
      this.tfModel = await tf.loadLayersModel('/models/handwriting_model.h5');
      this.tfModelLoaded = true;
      console.log('Handwriting model loaded successfully');
    } catch (error) {
      console.error('Error initializing handwriting model:', error);
      throw error;
    }
  }

  private async preprocessImage(imageFile: File): Promise<tf.Tensor> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const img = new Image();
          img.onload = async () => {
            const tensor = tf.browser.fromPixels(img)
              .resizeNearestNeighbor([224, 224])
              .toFloat()
              .div(255.0)
              .expandDims(0);
            resolve(tensor);
          };
          img.src = reader.result as string;
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  public async processImage(imageFile: File): Promise<string> {
    if (!this.tfModelLoaded) {
      throw new Error('Handwriting model is not initialized yet');
    }

    try {
      const tensor = await this.preprocessImage(imageFile);
      const predictions = await this.tfModel!.predict(tensor) as tf.Tensor;
      const result = await predictions.data();

      tensor.dispose();
      predictions.dispose();

      return this.processModelOutput(result);
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  private processModelOutput(output: Float32Array): string {
    // Convert the model output to text
    // This implementation assumes the model outputs probabilities for each character
    // You may need to adjust this based on your model's specific output format
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Process the output array in chunks of size equal to the number of possible characters
    for (let i = 0; i < output.length; i += characters.length) {
      const chunk = output.slice(i, i + characters.length);
      const maxIndex = chunk.indexOf(Math.max(...chunk));
      if (maxIndex >= 0 && maxIndex < characters.length) {
        result += characters[maxIndex];
      }
    }
    
    return result;
  }

  public async terminate() {
    if (this.tfModel) {
      this.tfModel.dispose();
    }
  }
} 