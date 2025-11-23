import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImagePlus, Maximize2, FileDown, Scissors, Layers } from 'lucide-react';

const tools = [
  { id: 'convert', label: 'Convert', icon: FileDown },
  { id: 'resize', label: 'Resize', icon: Maximize2 },
  { id: 'compress', label: 'Compress', icon: Layers },
  { id: 'remove-bg', label: 'Remove BG', icon: Scissors },
];

const Canvas = ({ image, onImageUpload, zoom, selectedFeature, onSelectFeature }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    noClick: false
  });

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col overflow-hidden relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(#fff 1px, transparent 1px),
          linear-gradient(90deg, #fff 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>

      {!image ? (
        /* Empty State with Upload */
        <div 
          {...getRootProps()}
          className="flex-1 flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className={`
            text-center z-10 transition-all
            ${isDragActive ? 'scale-[1.02]' : 'scale-100'}
          `}>
            <div className={`
              mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-5
              transition-all
              ${isDragActive 
                ? 'bg-[#0066ff] text-white' 
                : 'bg-[#2b2b2b] text-[#7a7a7a]'
              }
            `}>
              {isDragActive ? (
                <Upload className="w-9 h-9" />
              ) : (
                <ImagePlus className="w-9 h-9" />
              )}
            </div>
            
            <h2 className="text-lg font-semibold mb-1.5 text-[#e8e8e8]">
              {isDragActive ? 'Drop to upload' : 'Import image'}
            </h2>
            <p className="text-sm text-[#8a8a8a] mb-5">
              {isDragActive 
                ? 'Release to add your file' 
                : 'Drag and drop or click to browse'
              }
            </p>
            
            {!isDragActive && (
              <button
                type="button"
                className="px-5 py-2 bg-[#0066ff] text-white text-sm font-medium rounded-md hover:bg-[#0052cc] transition-colors"
              >
                Browse files
              </button>
            )}
            
            <div className="mt-6 text-xs text-[#6a6a6a]">
              JPG, PNG or WebP
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Feature Selection Bar */}
          <div className="flex items-center justify-center gap-2 py-4 px-6 border-b border-[#3a3a3a] z-10">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = selectedFeature === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectFeature(tool.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all
                    ${isActive 
                      ? 'bg-[#0066ff] text-white' 
                      : 'bg-[#2b2b2b] text-[#9a9a9a] hover:bg-[#333] hover:text-[#d0d0d0]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tool.label}
                </button>
              );
            })}
          </div>

          {/* Image Display with Drag & Drop */}
          <div 
            {...getRootProps()}
            className="flex-1 flex items-center justify-center overflow-hidden relative"
          >
            <input {...getInputProps()} />
            
            <div className="relative z-10 max-w-full max-h-full p-12">
              <div 
                className="relative rounded-lg overflow-hidden shadow-2xl"
                style={{ 
                  transform: `scale(${zoom / 100})`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Canvas"
                  className="max-w-full max-h-[calc(100vh-240px)] object-contain"
                />
              </div>
            </div>

            {/* Drag Overlay */}
            {isDragActive && (
              <div className="absolute inset-0 bg-[#0066ff]/10 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center bg-[#2b2b2b] px-8 py-6 rounded-xl">
                  <Upload className="w-12 h-12 text-[#0066ff] mx-auto mb-3" />
                  <p className="text-base font-medium text-[#e8e8e8]">Drop to replace</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Canvas;
