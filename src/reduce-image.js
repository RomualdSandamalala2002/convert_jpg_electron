const fs = require('fs');
const sharp = require('sharp');

/**
 * Reduce an image's size to not exceed 900KB and set it to 200 DPI.
 * @param {string} inputPath - Path to the input image.
 * @param {string} outputPath - Path to save the processed image.
 */
async function reduceImage(inputPath, outputPath) {
  try {
    let image = sharp(inputPath);

    // Read metadata
    const metadata = await image.metadata();

    // Set DPI to 200
    image = image.withMetadata({
      density: 200, // Set DPI
    });

    // Estimate quality and resize to ensure it's under 900KB
    let quality = 100; // Start with max quality
    let data;

    do {
      // Process the image with current quality
      data = await image.jpeg({ quality }).toBuffer();

      // Reduce quality by 5 if size exceeds 900KB
      if (data.length > 900 * 1024) {
        quality -= 5;
      } else {
        break; // Stop when size is acceptable
      }
    } while (quality > 0);

    // Write the processed image to output
    fs.writeFileSync(outputPath, data);

    console.log(`Image processed successfully! Saved to: ${outputPath}`);
  } catch (err) {
    console.error('Error processing the image:', err);
  }
}

module.exports = {
    reduce:reduceImage
}
