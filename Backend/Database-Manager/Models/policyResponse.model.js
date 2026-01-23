import {sequelize} from "../DatabaseManger.js";
import {DataTypes} from "sequelize";
import {Policy} from "./policy.model.js";

export const PolicyResponse = sequelize.define("PolicyResponse", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    user:{
        type: DataTypes.STRING,
    }
},
    {
        freezeTableName: true,
    })

Policy.hasOne(PolicyResponse)
PolicyResponse.belongsTo(Policy);