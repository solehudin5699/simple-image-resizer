const sharp = require("sharp");
const fs = require("fs");
const axios = require("axios");

const resizer = async (req, res) => {
  const { width, height, quality, format } = req.query;
  const { filename } = req.params;

  const imageUrl = req.url.startsWith("/image/resize/")
    ? req.url.slice(14)
    : "";

  try {
    let bufferImage;
    if (imageUrl) {
      bufferImage = await imageUrlToBuffer(imageUrl);
    }

    if (width) {
      if (parseInt(width) > 5000) {
        return res.status(400).json({
          success: false,
          message: "Error. Width must be <=5000",
        });
      }
    }

    if (height) {
      if (parseInt(height) > 5000) {
        return res.status(400).json({
          success: false,
          message: "Error. Height must be <=5000",
        });
      }
    }

    if (quality) {
      if (parseInt(quality) > 100) {
        return res.status(400).json({
          success: false,
          message: "Error. Quality must be <=100",
        });
      }
    }

    const image = sharp(bufferImage || `./public/${filename}`);
    let formatImage = (await image.metadata()).format;

    formatImage =
      format === "svg" || formatImage === "svg" ? "png" : format || formatImage;
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

    res.setHeader("content-type", "image");
    res.send(resizedImage);
  } catch (error) {
    res.setHeader("content-type", "application/json");
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  } finally {
    if (filename) {
      fs.unlinkSync("public/" + filename);
    }
  }
};

async function imageUrlToBuffer(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const buffer = Buffer.from(response.data);

    return buffer;
  } catch (error) {
    throw error;
  }
}

module.exports = resizer;
