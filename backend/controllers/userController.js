const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  const { Name, Location } = req.body;
  if (!Name || !Location) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.create({
    Name,
    Location,
  });

  if (user) {
    res.status(200).json({
      _id: user._id,
      Name: user.Name,
      Location: user.Location,
    });
    user.save();
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt");
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const valid = mongoose.Types.ObjectId.isValid(req.params.id);

  if (valid) {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ message: "User deleted." });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
