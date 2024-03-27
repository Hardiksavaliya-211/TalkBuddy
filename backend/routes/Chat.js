const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  chatAccess,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controller/Chat");

const router = express.Router();
router
  .post("/", protect, chatAccess)
  .get("/", protect, fetchChat)
  .post("/group", createGroupChat)
  .put("/rename", renameGroup)
  .put("/removegroup", removeFromGroup)
  .put("/addgroup", addToGroup);

module.exports = router;
