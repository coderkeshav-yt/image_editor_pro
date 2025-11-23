import { useState } from 'react';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';

function App() {
  const [image, setImage] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [options, setOptions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleImageUpload = (file) => {
    setImage(file);
    setSelectedFeature(null);
    setOptions({});
  };

  const handleFeatureSelect = (featureId) => {
    setSelectedFeature(featureId);
    setOptions({ imageFile: image });
  };

  const handleProcess = async () => {
    if (!image || !selectedFeature) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('feature', selectedFeature);
    
    // Remove imageFile from options before sending (it's not needed on backend)
    const { imageFile, ...backendOptions } = options;
    formData.append('options', JSON.stringify(backendOptions));
    
    console.log('Processing:', selectedFeature, 'with options:', backendOptions);

    try {
      const apiUrl = import.meta.env.PROD ? '/api/process' : 'http://localhost:5000/api/process';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error('Processing failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      let extension = 'jpg';
      if (selectedFeature === 'convert' && options.format) {
        extension = options.format;
      } else if (selectedFeature === 'remove-bg') {
        extension = 'png'; // Remove BG always outputs PNG
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
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      <Toolbar 
        image={image}
        zoom={zoom}
        setZoom={setZoom}
        onProcess={handleProcess}
        isProcessing={isProcessing}
        selectedFeature={selectedFeature}
      />

      <div className="flex flex-1 overflow-hidden">
        <Canvas 
          image={image}
          onImageUpload={handleImageUpload}
          zoom={zoom}
          selectedFeature={selectedFeature}
          onSelectFeature={handleFeatureSelect}
        />

        {image && selectedFeature && (
          <PropertiesPanel
            selectedFeature={selectedFeature}
            options={options}
            onOptionsChange={setOptions}
            image={image}
          />
        )}
      </div>
    </div>
  );
}

export default App;
