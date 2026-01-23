import {sequelize} from "../DatabaseManger.js";
import {DataTypes} from "sequelize";
import {PolicyType} from "./policyType.model.js";


export const Policy = sequelize.define("Policy", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name:{
        type: DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Name is required"
            }
        }
    },
    description:{
        type: DataTypes.STRING,
        defaultValue: ""
    },
    link:{
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Please provide a link to the policy"
            }
        }
    }
},
    {
        freezeTableName: true,
    })

PolicyType.hasOne(Policy);
Policy.belongsTo(PolicyType);


