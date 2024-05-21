
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";

export const Solicitud = sequelize.define('request', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    fechaContacto:{
        type: DataTypes.DATE,
        allowNull: false
    }, 
    fechaSolicitud: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaRespuesta: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

User.hasMany(Solicitud); // Un usuario puede tener muchos posts
Solicitud.belongsTo(User);