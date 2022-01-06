const path = require("path");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response, request } = require("express");

const { User } = require("../models");

const loadFile = async (req = request, res = response) => {
  try {
    //example with others extension
    //const fileName = await uploadFile(req.files, ['txt', 'xlxs',''], "otherFiles");
    //
    const fileName = await uploadFile(req.files, undefined, "users");
    res.status(200).json({
      fileName,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
};

//update image user on cloudinary
const updateImageCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `non-existent user with the id:  ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `route ${collection} without upload function`,
      });
  }

  try {
    //delete old file
    if (model.img) {
      const nameArr = model.img.split("/");
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;
    await model.save();

    res.status(200).json({
      model,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err,
    });
  }
};

//dispatch images
const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `non-existent user with the id:  ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `route ${collection} without show image function`,
      });
  }

  if (model.img) {
    return res.json({
      path: model.img,
    });
  }

  const pathNoImagen = path.join(__dirname, "../assets/img/no-image.jpg");
  res.sendFile(pathNoImagen);
};

module.exports = {
  loadFile,
  updateImageCloudinary,
  showImage,
};
