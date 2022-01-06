const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  permittedExtension = ["jpg", "jpeg", "png", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    //cut name
    const cutName = file.name.split(".");
    // get extension
    const extension = cutName[cutName.length - 1];
    //valid extension

    if (!permittedExtension.includes(extension)) {
      return reject(
        `the file extension "${extension}" is not permit, permitted extensions ${permittedExtension}`
      );
    }

    const newFileName = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", folder, newFileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(newFileName);
    });
  });
};

module.exports = {
  uploadFile,
};
