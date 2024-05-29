"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        // defaultValue: '2000-01-01'
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        // defaultValue: 'Otro'
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombreUsuario: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'Este usuario no tiene descripción!'
    },
    imgPerfil: {
        type: sequelize_1.DataTypes.TEXT('long'),
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    },
    tipoUsuario: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    isBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
});
