const express = require("express");
const { registerUser, loginUser, allUser } = require("../controller/user");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/", registerUser)
  .post("/login", loginUser)
  .get("/", protect, allUser);

module.exports = router;
