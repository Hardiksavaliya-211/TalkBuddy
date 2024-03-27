const Chat = require("../models/Chat");
const Msg = require("../models/Message");
const User = require("../models/User");

exports.sendMsg = async (req, res) => {
  const { content, id } = req.body;

  if (!content || !id) {
    return res.sendStatus(400);
  }

  var msgDetail = {
    sender: req.user._id,
    content: content,
    chat: id,
  };

  try {
    var msg = await Msg.create(msgDetail);
    msg = await msg.populate("sender", "name photo");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name photo email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      frontMsg: msg,
    });
    res.json(msg);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
};

exports.fetchMsg = async (req, res) => {
  try {
    const msg = await Msg.find({ chat: req.params.chatId })
      .populate("sender", "name photo email")
      .populate("chat");
    res.json(msg);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};
