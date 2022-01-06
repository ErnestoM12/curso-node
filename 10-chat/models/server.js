const express = require("express");
const cors = require("cors");

const fileUpload = require("express-fileupload");
const { createServer } = require("http");

const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {
      auth: "/api/auth",
      category: "/api/category",
      search: "/api/search",
      uploads: "/api/uploads",
      user: "/api/user",
    };

    //db connection
    this.connectDB();
    //Middleware
    this.middlewares();
    //Routes
    this.routes();
    //Sockets
    this.sockets();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //body read and  parse
    this.app.use(express.json());

    //file uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );

    //public directory
    this.app.use(express.static("public"));
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.category, require("../routes/category"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.user, require("../routes/user"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
