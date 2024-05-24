"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
exports.Contacto = connection_1.default.define('solicitud-contacto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: {
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
    }
}, {
    timestamps: false // Desactivar createdAt y updatedAt
});
user_model_1.User.hasMany(exports.Contacto); // Un usuario puede tener muchos posts
exports.Contacto.belongsTo(user_model_1.User, { foreignKey: 'userId' });
