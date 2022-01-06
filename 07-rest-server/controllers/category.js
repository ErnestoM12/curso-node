const { response, request } = require("express");
const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "user_name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    categories,
    msg: "success",
  });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "user_name");

  res.status(200).json({ category, msg: "success" });
};

const createCategory = async (req = request, res = response) => {
  const category_name = req.body.category_name.toUpperCase();

  const categoryDB = await Category.findOne({ category_name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB.category_name}, already exists`,
    });
  }

  //generate data
  const data = {
    category_name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json({
    msg: "success",
    category,
  });
};

const updateCategory = async (req = request, res = response) => {
  const id = req.params.id;

  const category = await Category.findOneAndUpdate(
    id,
    { category_name },
    { new: true }
  );
  res.status(201).json({
    msg: "success",
    category,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const category = await Category.findOneAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.status(201).json({
    category,
    msg: "success",
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
