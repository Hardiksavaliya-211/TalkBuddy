const express = require("express");
const user = express();

const path = require("path");
const bodyParser = require("body-parser");

user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, "public")));

const multer = require("multer");

var uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50000000000 },
});

const adminController = require("../controller/multerUpload");

user.post("/", uploader.single("file"), adminController.multerUploadFile);

module.exports = user;
