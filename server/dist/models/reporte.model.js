"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const foro_model_1 = require("./foro.model");
exports.Reporte = connection_1.default.define('report', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fechaReporte: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    }
}, { timestamps: false });
user_model_1.User.hasMany(exports.Reporte); // Un usuario puede tener muchos posts
foro_model_1.Foro.hasMany(exports.Reporte);
exports.Reporte.belongsTo(user_model_1.User, { foreignKey: 'userId' });
exports.Reporte.belongsTo(foro_model_1.Foro, { foreignKey: 'forumId' });
