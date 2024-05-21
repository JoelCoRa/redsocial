"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSeguidos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const organizacion_model_1 = require("./organizacion.model");
exports.PostSeguidos = connection_1.default.define('postsseguidos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idPost: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    contenidoPost: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaPublicacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comentarios: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    reportes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
});
user_model_1.User.hasMany(exports.PostSeguidos); // Un usuario puede tener muchos posts
organizacion_model_1.Organizacion.hasMany(exports.PostSeguidos); // Una organizacion puede tener muchos posts
exports.PostSeguidos.belongsTo(user_model_1.User);
exports.PostSeguidos.belongsTo(organizacion_model_1.Organizacion);
