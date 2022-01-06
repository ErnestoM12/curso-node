const http = require("http");

http
  .createServer((req, res) => {
    // res.setHeader("Content-Disposition", "attachtment; filename=/lista.csv");
    // res.writeHead(200, { "Content-Type": "application/csv" });
    // res.write("id,nombre\n");
    // res.write("1,juan\n");
    // res.write("2,ernesto\n");
    // res.write("3,ivan\n");
    // res.write("4,pedro\n");

    res.write("hola mundo");

    res.end();
  })
  .listen(8000);
console.log("escuchando el puerto:8000");
