const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const jwtValid = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msgs: "access token not found",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //get authenticaed user
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        msgs: "User not exists",
      });
    }

    //verify user state
    if (!user.state) {
      return res.status(401).json({
        msgs: "no access",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msgs: "access token invalid",
    });
  }
};

module.exports = {
  jwtValid,
};
