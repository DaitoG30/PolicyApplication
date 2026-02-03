import {sequelize} from "../DatabaseManger.js";
import {DataTypes} from "sequelize";
import {UserTypes} from  "./userType.model.js"


export const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        freezeTableName: true,
    })

UserTypes.hasOne(User)
User.belongsTo(UserTypes);