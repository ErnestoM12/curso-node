const fs = require("fs");
const inquirer = require("inquirer");
const archivo = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerBD = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);
  console.log(data);

  return data;
};

module.exports = {
  guardarDB,
  leerBD,
};
