import { Sequelize } from "sequelize";

const db = new Sequelize('node-tsc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

})

export default db;