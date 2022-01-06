const { Router } = require("express");
const { check } = require("express-validator");
//functions controller
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");

//middlewares
const {
  validFields,
  jwtValid,
  isAdminRole,
  hasRole,
} = require("../middlewares");

//validator
const {
  validRole,
  validEmailExists,
  validUserExists,
} = require("../helpers/db-validators");
//instance router
const router = Router();

//routes
router.get("/", getUsers);

router.get(
  "/:id",
  [check("id", "not valid").isMongoId().custom(validUserExists), validFields],
  getUser
);

router.post(
  "/",
  [
    check("user_name", "Name is required").not().isEmpty(),
    check("password", "Password should be at least 6 characters").isLength({
      min: 6,
    }),
    check("email", "Email is Inavalid").isEmail().custom(validEmailExists),
    //check("role", "Role is not valid").isIn(["ADMIND_ROLE", "USER_ROLE"]),
    check("role").custom(validRole),
    validFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "not valid").isMongoId().custom(validUserExists),
    check("user_name", "Name is required").not().isEmpty(),
    check("role").custom(validRole),
    validFields,
  ],
  putUser
);

router.patch("/", patchUser);

router.delete(
  "/:id",
  [
    jwtValid,
    //isAdminRole,
    hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "no valid").isMongoId().custom(validUserExists),
    validFields,
  ],
  deleteUser
);

module.exports = router;
