import {sequelize} from "../DatabaseManger.js";
import {DataTypes} from "sequelize";
import {UserTypes} from  "./userType.model.js"


export const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address.',
            },
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password is required"
            }
        }
    }
},
    {
        freezeTableName: true,
    })

UserTypes.hasOne(User)
User.belongsTo(UserTypes);