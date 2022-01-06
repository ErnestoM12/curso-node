const { Router } = require("express");
const { check } = require("express-validator");

//controller
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
} = require("../controllers/category");
//validates
const { vaildCategoryIdExist } = require("../helpers/db-validators");

//middlewares
const { jwtValid, validFields, isAdminRole } = require("../middlewares");

const router = Router();

//get categories
router.get("/", getCategories);
//get category
router.get(
  "/:id",
  [check("id").isMongoId().custom(vaildCategoryIdExist), validFields],
  getCategory
);
//create category
router.post(
  "/",
  [
    jwtValid,
    check("category_name", "category name is required").not().isEmpty(),
    validFields,
  ],
  createCategory
);
//update category
router.put(
  "/:id",
  [
    jwtValid,
    check("id").isMongoId().custom(vaildCategoryIdExist),
    check("category_name", "category name is required").not().isEmpty(),
    validFields,
  ],
  updateCategory
);
//delete category
router.delete(
  "/:id",
  [
    jwtValid,
    isAdminRole,
    check("id").isMongoId().custom(vaildCategoryIdExist),
    validFields,
  ],
  deleteCategory
);

module.exports = router;
