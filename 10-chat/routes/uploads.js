const { Router } = require("express");
const { check } = require("express-validator");
//controller
const {
  loadFile,
  updateImageCloudinary,
  showImage,
} = require("../controllers/uploads");
//helpers
const { permittedCollections } = require("../helpers");
//middlewares
const { validFields, validUploadFile } = require("../middlewares");

const router = Router();

router.post("/", validUploadFile, loadFile);

router.put(
  "/:collection/:id",
  [
    validUploadFile,
    check("id", "should be a mongoDB").isMongoId(),
    check("collection").custom((c) => permittedCollections(c, ["user"])),
    validFields,
  ],
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "should be a mongoDB").isMongoId(),
    check("collection").custom((c) => permittedCollections(c, ["user"])),
    validFields,
  ],
  showImage
);

module.exports = router;
