"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recurso = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const organizacion_model_1 = require("./organizacion.model");
exports.Recurso = connection_1.default.define('resource', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
user_model_1.User.hasMany(exports.Recurso); // Un usuario puede tener muchos recursos
organizacion_model_1.Organizacion.hasMany(exports.Recurso); // Unaorganizacion puede tener muchos recursos
exports.Recurso.belongsTo(user_model_1.User);
exports.Recurso.belongsTo(organizacion_model_1.Organizacion);
