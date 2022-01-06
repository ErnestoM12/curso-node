const { response, request } = require("express");
const User = require("../models/user");
const { createPassword } = require("../helpers/help-bcrypt");

const getUsers = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query; //arguments
  const query = { state: true }; //query

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    users,
    msg: "success",
  });
};

const getUser = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    user,
    msg: "success",
  });
};

const postUser = async (req = request, res = response) => {
  const { user_name, email, password, role } = req.body;
  const user = new User({ user_name, email, password, role });

  //encrypt password
  user.password = await createPassword(password);

  //save
  await user.save();

  res.status(201).json({
    user,
    msg: "success",
  });
};

const putUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...data } = req.body;

  if (password) {
    //encrypt password
    data.password = await createPassword(password);
  }

  const user = await User.findOneAndUpdate(id, data, { new: true });

  res.status(201).json({
    user,
  });
};

const patchUser = (req = request, res = response) => {
  res.json({
    msg: "patch API --comtroller",
  });
};

const deleteUser = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findOneAndUpdate(id, { state: false }, { new: true });
  res.status(200).json({
    user,
    msg: "success",
  });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
