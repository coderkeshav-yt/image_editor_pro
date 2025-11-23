import React from 'react';

const ControlPanel = ({ selectedFeature, options, onOptionsChange, onProcess }) => {
    if (!selectedFeature) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onOptionsChange({
            ...options,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto mt-6">
            <h3 className="text-lg font-semibold mb-4 capitalize">
                Configure {selectedFeature.replace('-', ' ')}
            </h3>

            <div className="space-y-4">
                {selectedFeature === 'convert' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Format</label>
                        <select
                            name="format"
                            value={options.format || 'jpeg'}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                        </select>
                    </div>
                )}

                {selectedFeature === 'resize' && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                                <input
                                    type="number"
                                    name="width"
                                    value={options.width || ''}
                                    onChange={handleChange}
                                    placeholder="e.g. 800"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={options.height || ''}
                                    onChange={handleChange}
                                    placeholder="e.g. 600"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="maintainAspectRatio"
                                checked={options.maintainAspectRatio !== false}
                                onChange={handleChange}
                                id="aspectRatio"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="aspectRatio" className="ml-2 block text-sm text-gray-900">
                                Maintain Aspect Ratio
                            </label>
                        </div>
                    </>
                )}

                {selectedFeature === 'compress' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quality: {options.quality || 80}%
                        </label>
                        <input
                            type="range"
                            name="quality"
                            min="1"
                            max="100"
                            value={options.quality || 80}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                )}

                {selectedFeature === 'remove-bg' && (
                    <div className="text-sm text-gray-500">
                        <p>Background removal will be applied automatically.</p>
                        <p className="mt-2 italic text-xs">Note: This is a simulated feature for demonstration.</p>
                    </div>
                )}

                <button
                    onClick={onProcess}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Process & Download
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
