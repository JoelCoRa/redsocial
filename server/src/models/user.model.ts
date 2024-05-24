
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
        // defaultValue: '2000-01-01'
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: 'Otro'
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
        allowNull: true,
        defaultValue: 'Este usuario no tiene descripción!'
    },    
    imgPerfil: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
        defaultValue: ''
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    cuentasSeguidas: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    seguidores: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    publicaciones: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    foros: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    solicitudes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    reportes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    tipoUsuario: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    modoOscuro: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    notificaciones: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})