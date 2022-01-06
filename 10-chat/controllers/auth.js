const { response, request } = require("express");
const User = require("../models/user");
const bcrytpjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt-service");
const { googleVerify } = require("../helpers/google-verify");
const { createPassword } = require("../helpers/help-bcrypt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //verify exists email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "user/password is not correct- correo",
      });
    }
    //verify user state
    if (!user.state) {
      return res.status(400).json({
        msg: "user not active",
      });
    }
    //verify password
    const validPassword = bcrytpjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "user/password is not correct",
      });
    }

    //generate JWT
    const token = await generateJWT(user._id);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { user_name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //random password
      const randon = (Math.random() + 1).toString(36).substring(5);
      //create user
      const data = {
        user_name,
        email,
        img,
        password: await createPassword(randon),
        role: "USER_ROLE",
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    //verify user state
    if (!user.state) {
      return res.status(401).json({
        msgs: "no access",
      });
    }

    //generate JWT
    const token = await generateJWT(user._id);

    res.status(200).json({
      token,
      user,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      msg: "google token invalid",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { user } = req;

  //generate JWT
  const token = await generateJWT(user._id);

  res.json({
    token,
    user,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
