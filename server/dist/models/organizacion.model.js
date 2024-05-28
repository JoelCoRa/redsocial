"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizacion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Organizacion = connection_1.default.define('organization', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    razonSocial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    sector: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rfc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
});
