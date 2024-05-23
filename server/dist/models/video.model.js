"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Video = connection_1.default.define('video', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    contenido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
