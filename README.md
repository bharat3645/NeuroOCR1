# NeuroOCR1

A deep learning-based OCR system for handwriting recognition using TensorFlow.js.

## Features

- Handwriting recognition using a pre-trained deep learning model
- Real-time image processing and text extraction
- Modern React-based user interface
- TypeScript support for better type safety
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bharat3645/NeuroOCR1.git
cd NeuroOCR1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
NeuroOCR1/
├── public/
│   └── models/
│       └── handwriting_model.h5
├── src/
│   ├── components/
│   │   └── ImageProcessor.tsx
│   ├── services/
│   │   └── modelService.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Usage

1. Open the application in your browser
2. Click "Select Image" to upload a handwriting image
3. Click "Process Image" to analyze the handwriting
4. The extracted text will be displayed below

## Model Details

The project uses a pre-trained deep learning model for handwriting recognition. The model:
- Accepts 224x224 pixel images
- Processes grayscale images
- Outputs character probabilities for A-Z, a-z, and 0-9

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 