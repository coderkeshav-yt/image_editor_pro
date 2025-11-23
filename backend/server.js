
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

        const processedImageBuffer = await processImage(req.file.buffer, feature, parsedOptions, req.file.mimetype);

        // Upload to Cloudinary (as requested)
        try {
            const uploadResult = await uploadToCloudinary(processedImageBuffer, `processed_${Date.now()}`);
            console.log('Uploaded to Cloudinary:', uploadResult.secure_url);
        } catch (uploadError) {
            console.error('Cloudinary upload failed:', uploadError);
            // Continue to send the file even if storage fails
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(processedImageBuffer);

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

// Only listen if not running on Vercel (local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
