const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, renewToken } = require("../controllers/auth");

//middlewares
const { validFields, jwtValid } = require("../middlewares");

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

router.get("/", jwtValid, renewToken);

module.exports = router;
