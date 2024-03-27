const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const User = require("../models/User");

const chatAccess = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400);
  }

  let chat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: id } } },
    ],
  })
    .populate("users", "-password")
    .populate("frontMsg");
  chat = await User.populate(chat, {
    path: "frontMsg.sender",
    select: "name photo email",
  });

  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, id],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = async (req, res) => {
  console.log("op");
  try {
    let chat = await Chat.find({
      $or: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { admin: req.user._id },
      ],
    })
      .populate("users", "-password")
      .populate("admin", "-password")
      .populate("frontMsg");
    chat = await User.populate(chat, {
      path: "frontMsg.sender",
      select: "name photo email",
    });
    res.status(200).send(chat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required ");
  }

  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      admin: req.body.admin,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("admin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const renameGroup = async (req, res) => {
  const { id, name } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    {
      chatName: name,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

const removeFromGroup = async (req, res) => {
  const { id, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    id,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

const addToGroup = async (req, res) => {
  const { id, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    id,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};

module.exports = {
  chatAccess,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
