import React from 'react';

const features = [
    { id: 'convert', label: 'Convert', icon: '🔄' },
    { id: 'resize', label: 'Resize', icon: '📏' },
    { id: 'compress', label: 'Compress', icon: '🗜️' },
    { id: 'remove-bg', label: 'Remove BG', icon: '✂️' },
];

const FeatureSelector = ({ selectedFeature, onSelectFeature }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 my-8">
            {features.map((feature) => (
                <button
                    key={feature.id}
                    onClick={() => onSelectFeature(feature.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedFeature === feature.id
                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    <span className="text-xl">{feature.icon}</span>
                    {feature.label}
                </button>
            ))}
        </div>
    );
};

export default FeatureSelector;
