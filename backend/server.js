
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { processImage } = require('./utils/imageProcessor');
const { uploadToCloudinary } = require('./utils/cloudinary');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.post('/api/process', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const { feature, options } = req.body;
        const parsedOptions = options ? JSON.parse(options) : {};

        const result = await processImage(req.file.buffer, feature, parsedOptions, req.file.mimetype);
        
        // Handle both old format (buffer) and new format (object with buffer and format)
        const processedImageBuffer = result.buffer || result;
        const outputFormat = result.format || 'jpeg';

        // Upload to Cloudinary (as requested)
        try {
            const uploadResult = await uploadToCloudinary(processedImageBuffer, `processed_${Date.now()}`);
            console.log('Uploaded to Cloudinary:', uploadResult.secure_url);
        } catch (uploadError) {
            console.error('Cloudinary upload failed:', uploadError);
            // Continue to send the file even if storage fails
        }

        // Set correct content type based on format
        const mimeTypes = {
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp'
        };
        
        res.set('Content-Type', mimeTypes[outputFormat] || 'image/jpeg');
        res.send(processedImageBuffer);

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image', details: error.message });
    }
});

// Only listen if not running on Vercel (local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
