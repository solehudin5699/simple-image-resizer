const sharp = require('sharp');
const fs = require('fs');

const resizer = async (req, res) => {
  try {
    const { width, height, quality, format } = req.query;
    const { filename } = req.params;

    if (width) {
      if (parseInt(width) > 5000) {
        return res.status(400).json({
          success: false,
          message: 'Error. Width must be <=5000',
        });
      }
    }

    if (height) {
      if (parseInt(height) > 5000) {
        return res.status(400).json({
          success: false,
          message: 'Error. Height must be <=5000',
        });
      }
    }

    if (quality) {
      if (parseInt(quality) > 100) {
        return res.status(400).json({
          success: false,
          message: 'Error. Quality must be <=100',
        });
      }
    }

    const image = sharp(`./public/${filename}`);
    let formatImage = (await image.metadata()).format;
    formatImage = format || formatImage === 'svg' ? 'png' : formatImage;
    const widthImage = width ? parseInt(width) : (await image.metadata()).width;
    const heightImage = height
      ? parseInt(height)
      : (await image.metadata()).height;

    const resizedImage = await image
      .resize(widthImage, heightImage)
      .toFormat(formatImage, {
        quality: quality ? parseInt(quality) : 100,
      })
      .withMetadata()
      .toBuffer();

    res.setHeader('content-type', 'image');
    res.send(resizedImage);

    fs.unlinkSync('public/' + filename);
  } catch (error) {
    res.setHeader('content-type', 'application/json');
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = resizer;
