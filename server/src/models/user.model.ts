import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: 'Este usuario no tiene descripción!'
    },    
    imgPerfil: {
        type: DataTypes.TEXT('long'),        
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    tipoUsuario: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
})