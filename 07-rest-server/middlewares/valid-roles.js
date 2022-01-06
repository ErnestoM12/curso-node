const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "attempt to verify the role without a valid access token",
    });
  }
  const { role } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "user role no access",
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "attempt to verify the role without a valid access token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: "user role no access",
      });
    }

    console.log(roles);
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
