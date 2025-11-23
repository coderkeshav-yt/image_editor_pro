const fs = require('fs');
const { processImage } = require('./utils/imageProcessor');

async function test() {
    try {
        // Read a test image
        const buffer = fs.readFileSync('./test_convert.jpg');
        
        console.log('Testing remove-bg feature...');
        console.log('Input buffer size:', buffer.length);
        
        const result = await processImage(buffer, 'remove-bg', { threshold: 240 }, 'image/jpeg');
        
        console.log('Result:', result);
        console.log('Output buffer size:', result.buffer.length);
        console.log('Output format:', result.format);
        
        // Save the result
        fs.writeFileSync('./test_remove_bg_output.png', result.buffer);
        console.log('✓ Success! Output saved to test_remove_bg_output.png');
        
    } catch (error) {
        console.error('✗ Error:', error.message);
        console.error(error.stack);
    }
}

test();
