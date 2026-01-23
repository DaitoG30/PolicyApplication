import {sequelize} from "../DatabaseManger.js";
import { DataTypes } from "sequelize";


export const UserTypes = sequelize.define("UserTypes", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userType: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ""
    }
},
    {
        freezeTableName: true,
    })