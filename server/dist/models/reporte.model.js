"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
exports.Reporte = connection_1.default.define('report', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
user_model_1.User.hasMany(exports.Reporte); // Un usuario puede tener muchos posts
post_model_1.Post.hasMany(exports.Reporte);
exports.Reporte.belongsTo(user_model_1.User);
exports.Reporte.belongsTo(post_model_1.Post);
