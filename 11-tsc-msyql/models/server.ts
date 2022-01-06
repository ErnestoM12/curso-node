import express, { Application } from "express"
import userRoutes from '../routes/user'
import cors from "cors"
import db from "../db/config"



class Server {
  private app: Application
  private port: string
  private apiPath = {
    user: '/api/user'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000"

    //initial methods
    this.dbConnection()
    this.middlewares()
    this.routes()


  }

  middlewares() {
    //CORS
    this.app.use(cors())
    //Read and parse body
    this.app.use(express.json())
    //public folder
    this.app.use(express.static('public'))
  }

  async dbConnection() {
    try {

      await db.authenticate()
      console.log('bd online')

    } catch (error: any) {
      throw new Error(error)

    }
  }

  routes() {
    this.app.use(this.apiPath.user, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening at http://localhost:${this.port}`)
    });
  }
}

export default Server;
