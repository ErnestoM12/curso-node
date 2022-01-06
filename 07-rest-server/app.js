require("dotenv").config();
const Server = require("./models/server");
//instancia del servidor
const server = new Server();

server.listen();
