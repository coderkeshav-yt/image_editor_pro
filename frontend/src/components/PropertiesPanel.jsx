const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const estimateCompressedSize = (originalSize, quality) => {
  const qualityFactor = quality / 100;
  const compressionRatio = 0.15 + (qualityFactor * qualityFactor * 0.45);
  return Math.round(originalSize * compressionRatio);
};

const PropertiesPanel = ({ selectedFeature, options, onOptionsChange, image }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onOptionsChange({
      ...options,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const featureTitles = {
    'convert': 'Convert Format',
    'resize': 'Resize Image',
    'compress': 'Compress',
    'remove-bg': 'Remove Background'
  };

  return (
    <div className="w-72 bg-[#2b2b2b] border-l border-[#3a3a3a] overflow-y-auto">
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#e8e8e8] mb-1">
            {featureTitles[selectedFeature]}
          </h2>
          <p className="text-xs text-[#8a8a8a]">Configure settings</p>
        </div>

        {/* Settings */}
        <div className="space-y-5">
          {selectedFeature === 'convert' && (
            <div>
              <label className="block text-xs font-medium text-[#b0b0b0] mb-2">
                Format
              </label>
              <select
                name="format"
                value={options.format || 'jpeg'}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#232323] border border-[#3a3a3a] rounded-md text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0066ff] transition-colors"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          )}

          {selectedFeature === 'resize' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#b0b0b0] mb-2">
                    Width
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={options.width || ''}
                    onChange={handleChange}
                    placeholder="800"
                    className="w-full px-3 py-2 bg-[#232323] border border-[#3a3a3a] rounded-md text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0066ff] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#b0b0b0] mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={options.height || ''}
                    onChange={handleChange}
                    placeholder="600"
                    className="w-full px-3 py-2 bg-[#232323] border border-[#3a3a3a] rounded-md text-sm text-[#e8e8e8] focus:outline-none focus:border-[#0066ff] transition-colors"
                  />
                </div>
              </div>
              
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="maintainAspectRatio"
                    checked={options.maintainAspectRatio !== false}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#3a3a3a] rounded-full peer-checked:bg-[#0066ff] transition-colors"></div>
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
                <span className="text-xs text-[#b0b0b0]">
                  Lock aspect ratio
                </span>
              </label>
            </>
          )}

          {selectedFeature === 'compress' && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-medium text-[#b0b0b0]">
                  Quality
                </label>
                <span className="text-sm font-semibold text-[#e8e8e8]">
                  {options.quality || 80}%
                </span>
              </div>
              
              <input
                type="range"
                name="quality"
                min="1"
                max="100"
                value={options.quality || 80}
                onChange={handleChange}
                className="w-full h-1.5 bg-[#3a3a3a] rounded-full appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-[10px] text-[#6a6a6a] mt-1.5">
                <span>Low</span>
                <span>High</span>
              </div>

              {options.imageFile && (
                <div className="mt-5 p-3.5 bg-[#232323] rounded-lg border border-[#3a3a3a]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8a8a8a]">Original</span>
                    <span className="text-xs font-medium text-[#d0d0d0]">
                      {formatFileSize(options.imageFile.size)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8a8a8a]">Compressed</span>
                    <span className="text-xs font-semibold text-[#0066ff]">
                      {formatFileSize(estimateCompressedSize(options.imageFile.size, options.quality || 80))}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#3a3a3a]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#6a6a6a]">Savings</span>
                      <span className="text-[10px] font-medium text-[#00c853]">
                        {Math.round((1 - estimateCompressedSize(options.imageFile.size, options.quality || 80) / options.imageFile.size) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedFeature === 'remove-bg' && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-medium text-[#b0b0b0]">
                  Sensitivity
                </label>
                <span className="text-sm font-semibold text-[#e8e8e8]">
                  {options.threshold || 240}
                </span>
              </div>
              
              <input
                type="range"
                name="threshold"
                min="100"
                max="255"
                value={options.threshold || 240}
                onChange={handleChange}
                className="w-full h-1.5 bg-[#3a3a3a] rounded-full appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-[10px] text-[#6a6a6a] mt-1.5">
                <span>Less</span>
                <span>More</span>
              </div>

              <div className="mt-4 p-3.5 bg-[#232323] rounded-lg border border-[#3a3a3a]">
                <p className="text-xs text-[#b0b0b0] leading-relaxed mb-2">
                  Works best with solid or light backgrounds. Adjust sensitivity to control which colors are removed.
                </p>
                <p className="text-[10px] text-[#6a6a6a] italic">
                  Output will be PNG with transparency
                </p>
              </div>
            </div>
          )}

          {/* Image Info */}
          {image && (
            <div className="pt-5 border-t border-[#3a3a3a]">
              <h3 className="text-xs font-medium text-[#8a8a8a] mb-3">Details</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-[#6a6a6a]">Name</span>
                  <span className="text-[#b0b0b0] truncate max-w-[160px]" title={image.name}>
                    {image.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a6a6a]">Size</span>
                  <span className="text-[#b0b0b0]">{formatFileSize(image.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6a6a6a]">Type</span>
                  <span className="text-[#b0b0b0]">{image.type.split('/')[1].toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
