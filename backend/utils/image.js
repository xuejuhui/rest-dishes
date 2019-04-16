const sharp = require("sharp");

module.exports.formatImage = async function(image, width, height) {
  const resizeImage = await sharp(image)
    .resize(width, height)
    .toBuffer();
  return resizeImage;
};
