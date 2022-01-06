const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category } = require("../models");

const permitCollections = ["users", "categories"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i"); //insensitive search

  const users = await User.find({
    $or: [{ user_name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  return res.status(200).json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.status(200).json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i"); //insensitive search

  const categories = await Category.find({
    category_name: regex,
    state: true,
  });

  return res.status(200).json({
    results: categories,
  });
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!permitCollections.includes(collection)) {
    return res.status(404).json({
      msg: "collection does not exists",
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    default:
      res.status(500).json({
        msg: `route ${collection} without search function`,
      });
  }
};

module.exports = {
  search,
};
