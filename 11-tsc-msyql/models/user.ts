import { DataTypes } from "sequelize";
import db from "../db/config";

const User = db.define('User', {
    user_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    },

    password: {
        type: DataTypes.STRING
    },

})

export default User;
