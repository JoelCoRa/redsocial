import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";



export const ContactoGeneral = sequelize.define('contactogeneral',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    asunto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaSolicitud: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
},
{
    timestamps: false
})