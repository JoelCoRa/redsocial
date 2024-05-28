"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoGeneral = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.ContactoGeneral = connection_1.default.define('contactogeneral', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    asunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fechaSolicitud: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    },
}, {
    timestamps: false
});
