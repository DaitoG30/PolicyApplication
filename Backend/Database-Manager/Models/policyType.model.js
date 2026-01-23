import {sequelize} from "../DatabaseManger.js";
import {DataTypes} from "sequelize";


export const PolicyType = sequelize.define("PolicyType", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    policyType:{
        type: DataTypes.STRING,
        defaultValue: "",
    },
    description:{
        type: DataTypes.STRING,
        defaultValue: ""
    }
},
    {
        freezeTableName: true,
    })
