const sharp = require('sharp');

const processImage = async (buffer, feature, options, originalMimeType) => {
    let pipeline = sharp(buffer);

    switch (feature) {
        case 'convert':
            const format = options.format || 'jpeg';
            pipeline = pipeline.toFormat(format);
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
            // Detect format or default to jpeg for compression
            // Ideally we should keep original format if possible, or convert to jpeg/webp
            // For simplicity, let's default to jpeg if not specified, or use the input format if supported
            pipeline = pipeline.jpeg({ quality });
            break;

        case 'remove-bg':
            // Basic mock or simple edge detection if possible.
            // Sharp doesn't do AI background removal. 
            // We can try to make it transparent if it's a simple task, but usually this needs an external API.
            // For now, we will just return the original image or maybe grayscale it to show "processing"
            // or use a simple threshold if requested.
            // User asked for "simple implementation" or "simulate".
            // Let's simulate by just returning it (or maybe adding a watermark/overlay to show it was "processed").
            // Real BG removal needs generic-js or similar, which is heavy.
            // We'll just pass through for now with a comment.
            console.log('Background removal requested - Mock implementation');
            break;

        default:
            break;
    }

    return await pipeline.toBuffer();
};

module.exports = { processImage };
