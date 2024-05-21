"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeguidoSeguidor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.SeguidoSeguidor = connection_1.default.define('seguidosseguidores', {
    idEntry: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userIdSeguido: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    userIdSeguidor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombreUserSeguido: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombreUserSeguidor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
});
