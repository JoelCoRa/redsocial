"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apoyo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
exports.Apoyo = connection_1.default.define('solicitud-apoyo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo: {
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
    }
}, {
    timestamps: false // Desactivar createdAt y updatedAt
});
user_model_1.User.hasMany(exports.Apoyo); // Un usuario puede tener muchos posts
exports.Apoyo.belongsTo(user_model_1.User, { foreignKey: 'userId' });
