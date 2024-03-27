const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { model } = require("mongoose");
const { sendMsg, fetchMsg } = require("../controller/Msg");

const router = express.Router();

router.post("/", protect, sendMsg).get("/:chatId", protect, fetchMsg);

module.exports = router;
