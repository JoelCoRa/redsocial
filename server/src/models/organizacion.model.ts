

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
    razonSocial: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    sector:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rfc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
});
