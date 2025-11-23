import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import FeatureSelector from './components/FeatureSelector';
import ControlPanel from './components/ControlPanel';

function App() {
  const [image, setImage] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [options, setOptions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file) => {
    setImage(file);
    setSelectedFeature(null);
    setOptions({});
  };

  const handleFeatureSelect = (featureId) => {
    setSelectedFeature(featureId);
    // Include image file in options for size calculation
    setOptions({ imageFile: image });
  };

  const handleProcess = async () => {
    if (!image || !selectedFeature) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('feature', selectedFeature);
    formData.append('options', JSON.stringify(options));

    try {
      // Use relative path for production (Vercel), or localhost for local dev
      const apiUrl = import.meta.env.PROD ? '/api/process' : 'http://localhost:5000/api/process';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Determine extension based on options or original file
      let extension = 'jpg';
      if (selectedFeature === 'convert' && options.format) {
        extension = options.format;
      } else if (image.type === 'image/png') {
        extension = 'png';
      } else if (image.type === 'image/webp') {
        extension = 'webp';
      }

      link.setAttribute('download', `imagepro_${selectedFeature}_${Date.now()}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
            Image Pro Editor
          </h1>
          <p className="text-lg text-gray-600">
            Quick, professional image transformations.
          </p>
        </header>

        <main>
          {!image ? (
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Editor</h2>
                  <button
                    onClick={() => setImage(null)}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>

                <div className="flex justify-center mb-8 bg-gray-100 rounded-lg p-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-64 object-contain rounded shadow-sm"
                  />
                </div>

                <FeatureSelector
                  selectedFeature={selectedFeature}
                  onSelectFeature={handleFeatureSelect}
                />

                {selectedFeature && (
                  <ControlPanel
                    selectedFeature={selectedFeature}
                    options={options}
                    onOptionsChange={setOptions}
                    onProcess={handleProcess}
                  />
                )}

                {isProcessing && (
                  <div className="mt-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2 text-blue-600 font-medium">Processing...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
