"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foro = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
exports.Foro = connection_1.default.define('forum', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ultimaActividad: {
        type: sequelize_1.DataTypes.DATE,
    },
    contenido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    etiqueta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    anonimo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    fechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    }
}, { timestamps: false });
user_model_1.User.hasMany(exports.Foro); // Un usuario puede tener muchos foros
exports.Foro.belongsTo(user_model_1.User, { foreignKey: 'userId' });
