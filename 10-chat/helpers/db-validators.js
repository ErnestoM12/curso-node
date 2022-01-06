const { Role, User, Category } = require("../models");

const validRole = async (role) => {
  if (role === "") throw new Error(`Role is required`);
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role ${role} is not exists in the DB`);
  }
};

const validEmailExists = async (email) => {
  if (email === "") throw new Error(`Email is required`);
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already  exists in the DB`);
  }
};

const validUserExists = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`User not exists`);
  }
};

const vaildCategoryIdExist = async (id) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`category not exists`);
  }
};

const permittedCollections = (collection = "", collections = []) => {
  const including = collections.includes(collection);
  if (!including) {
    throw new Error(
      `the collection ${collection} is not permit, permitted collections ${collections}`
    );
  }

  return true;
};

module.exports = {
  validRole,
  validEmailExists,
  validUserExists,
  vaildCategoryIdExist,
  permittedCollections,
};
