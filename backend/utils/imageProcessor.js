const sharp = require('sharp');

const processImage = async (buffer, feature, options, originalMimeType) => {
    let pipeline = sharp(buffer);
    let outputFormat = 'jpeg'; // Default format

    switch (feature) {
        case 'convert':
            const format = options.format || 'jpeg';
            pipeline = pipeline.toFormat(format);
            outputFormat = format;
            break;

        case 'resize':
            const width = options.width ? parseInt(options.width) : null;
            const height = options.height ? parseInt(options.height) : null;
            const fit = options.maintainAspectRatio ? 'contain' : 'fill';

            if (width || height) {
                pipeline = pipeline.resize({ width, height, fit });
            }
            break;

        case 'compress':
            const quality = options.quality ? parseInt(options.quality) : 80;
            pipeline = pipeline.jpeg({ quality });
            break;

        case 'remove-bg':
            try {
                // Simple background removal using color threshold
                const threshold = parseInt(options.threshold) || 240;
                
                console.log('Remove BG - Threshold:', threshold);
                console.log('Input buffer size:', buffer.length);
                
                // Process image to remove background
                const { data, info } = await sharp(buffer)
                    .ensureAlpha()
                    .raw()
                    .toBuffer({ resolveWithObject: true });
                
                console.log('Image info:', info);
                
                // Process each pixel
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    // Calculate brightness
                    const brightness = (r + g + b) / 3;
                    
                    // If pixel is bright (close to white), make it transparent
                    if (brightness > threshold) {
                        data[i + 3] = 0; // Set alpha to 0 (transparent)
                    }
                }
                
                console.log('Pixels processed, creating output...');
                
                // Create new image from processed data
                const resultBuffer = await sharp(data, {
                    raw: {
                        width: info.width,
                        height: info.height,
                        channels: 4
                    }
                }).png().toBuffer();
                
                console.log('Output buffer size:', resultBuffer.length);
                
                return { buffer: resultBuffer, format: 'png' };
            } catch (error) {
                console.error('Remove BG error:', error);
                throw error;
            }

        default:
            break;
    }

    const resultBuffer = await pipeline.toBuffer();
    return { buffer: resultBuffer, format: outputFormat };
};

module.exports = { processImage };
