const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");

//middlewares
const { validFields } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is Inavalid").isEmail(),
    check("password", "Password is Invalid").not().isEmpty(),
    validFields,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "google token is required").not().isEmpty(), validFields],
  googleSignIn
);

module.exports = router;
