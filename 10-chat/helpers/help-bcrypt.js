const bcrytpjs = require("bcryptjs");

const createPassword = async (password) => {
  const salt = bcrytpjs.genSaltSync();
  hash = bcrytpjs.hashSync(password, salt);

  return hash;
};

module.exports = {
  createPassword,
};
