const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../dabase/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
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
    this.app.use(this.paths.product, require("../routes/product"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.user, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
