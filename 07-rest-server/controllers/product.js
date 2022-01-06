const { response, request } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("category", "category_name")
      .populate("user", "user_name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    products,
    msg: "success",
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category", "category_name")
    .populate("user", "user_name");

  res.status(200).json({ product, msg: "success" });
};

const createProduct = async (req = request, res = response) => {
  const { state, user, product_name, ...body } = req.body;

  const ProductDB = await Product.findOne({
    product_name: product_name.toUpperCase(),
  });

  if (ProductDB) {
    return res.status(400).json({
      msg: `La categoria ${ProductDB.product_name}, ya existe`,
    });
  }

  //generate data
  const data = {
    ...body,
    product_name: product_name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json({
    msg: "success",
    product,
  });
};

const updateProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const { state, user, ...body } = req.body;

  if (body.product_name) {
    body.product_name = body.product_name.toUpperCase();
  }

  body.user = req.user._id;

  const product = await Product.findOneAndUpdate(id, body, { new: true });
  res.status(201).json({
    msg: "success",
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findOneAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.status(201).json({
    product,
    msg: "success",
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
