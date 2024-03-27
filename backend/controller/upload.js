const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgcfkr6q5",
  api_key: "484766234228619",
  api_secret: "tJc2489DOZR_-6OTxhLmB-pSCuo",
});
exports.uploadFile = async (myFile) => {
  try {
    const result = await cloudinary.uploader.upload(myFile);
    return result;
  } catch (err) {
    console.log(err);
  }
};
