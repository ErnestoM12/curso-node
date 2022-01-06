const fieldsMiddleware = require("./validFields");
const jwtMiddleware = require("./valid-jwt");
const rolesMiddleware = require("./valid-roles");
const fileMiddleware = require("./valid-file");

module.exports = {
  ...fieldsMiddleware,
  ...jwtMiddleware,
  ...rolesMiddleware,
  ...fileMiddleware,
};
