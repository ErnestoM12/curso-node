const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    //Middleware
    this.middlewares();
    //Routes
    this.routes();
    //sockets
    this.sockets();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //body read and  parse
    this.app.use(express.json());

    //public directory
    this.app.use(express.static("public"));
  }

  routes() {}

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
