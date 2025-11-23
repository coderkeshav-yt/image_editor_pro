import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // Need to install react-dropzone

const ImageUpload = ({ onImageUpload }) => {
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
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center h-64
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
        >
            <input {...getInputProps()} />
            <div className="text-gray-500">
                {isDragActive ? (
                    <p className="text-lg text-blue-500 font-medium">Drop the image here...</p>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-lg font-medium">Drag & drop an image here</p>
                        <p className="text-sm mt-2">or click to select a file</p>
                        <p className="text-xs mt-4 text-gray-400">Supports JPG, PNG, WebP</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
