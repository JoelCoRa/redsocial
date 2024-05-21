

import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";
import { Post } from "./post.model";

export const Organizacion = sequelize.define('organization', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    publicaciones: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    recursos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});
