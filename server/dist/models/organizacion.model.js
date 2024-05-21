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
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    publicaciones: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    recursos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
});
