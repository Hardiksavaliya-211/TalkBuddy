const mongoose = require("mongoose");

const photoModel = mongoose.Schema(
  {
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoModel);
module.exports = Photo;
