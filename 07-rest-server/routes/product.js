const { Router } = require("express");
const { check } = require("express-validator");

//controller
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
//validates
const {
  vaildCategoryIdExist,
  vaildProductIdExist,
} = require("../helpers/db-validators");

//middlewares
const { jwtValid, validFields, isAdminRole } = require("../middlewares");

const router = Router();

//get products
router.get("/", getProducts);
//get producto
router.get(
  "/:id",
  [check("id").isMongoId().custom(vaildProductIdExist), validFields],
  getProduct
);
//create producto
router.post(
  "/",
  [
    jwtValid,
    check("category").isMongoId().custom(vaildCategoryIdExist),
    check("product_name", "product name is required").not().isEmpty(),
    validFields,
  ],
  createProduct
);
//update producto
router.put(
  "/:id",
  [jwtValid, check("id").isMongoId().custom(vaildProductIdExist), validFields],
  updateProduct
);
//delete producto
router.delete(
  "/:id",
  [
    jwtValid,
    isAdminRole,
    check("id").isMongoId().custom(vaildProductIdExist),
    validFields,
  ],
  deleteProduct
);

module.exports = router;
