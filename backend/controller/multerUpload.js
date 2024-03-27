const Upload = require("./upload");
const Photo = require("../models/Photo");

const multerUploadFile = async (req, res) => {
  try {
    const upload = await Upload.uploadFile(req.file.path);
    var store = new Photo({
      photo: upload.secure_url,
    });
    var record = await store.save();
    res.json({
      photo: record.photo,
    });
  } catch (error) {
    res.send({ succes: false, msg: error.message });
  }
};

module.exports = {
  multerUploadFile,
};
