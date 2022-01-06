const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          reject("there is an error jwt generator");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validJWTSocket = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return null;
    }
    if (!user.state) {
      return null;
    }
    //return user
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateJWT,
  validJWTSocket,
};
