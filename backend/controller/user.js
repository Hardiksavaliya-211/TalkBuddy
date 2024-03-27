const generateToken = require("../config/jwtToken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !password || !email) {
    res.status(404);
    throw new Error("please enter all field ");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    photo: pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const loginUser = async (req, res) => {
  console.log("avi  gyo hu");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.photo,
      token: generateToken(user._id),
    });
    console.log(user);
  } else {
    res.status(400);
    console.log("eee");
    throw new Error("User not found");
  }
};

const allUser = asyncHandler(async (req, res) => {
  const query = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { email: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(query).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, loginUser, allUser };
