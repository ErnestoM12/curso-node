require("dotenv").config();
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT;
//handler bars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//servir contetndio statico
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.render("home", {
//     nombre: "Ernesto Maya",
//     titulo: "Curso de Node",
//   });
// });

// app.get("/generic", (req, res) => {
//   res.render("generic", {
//     nombre: "Ernesto Maya",
//     titulo: "Curso de Node",
//   });
// });
// app.get("/elements", (req, res) => {
//   res.render("elements", {
//     nombre: "Ernesto Maya",
//     titulo: "Curso de Node",
//   });
// });
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
