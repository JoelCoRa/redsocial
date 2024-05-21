"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitud = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
exports.Solicitud = connection_1.default.define('request', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaContacto: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fechaSolicitud: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fechaRespuesta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
});
user_model_1.User.hasMany(exports.Solicitud); // Un usuario puede tener muchos posts
exports.Solicitud.belongsTo(user_model_1.User);
