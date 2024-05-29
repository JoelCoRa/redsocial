"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
exports.Post = connection_1.default.define('post', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ""
    },
    fechaPublicacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    comentarios: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
}, { timestamps: false });
user_model_1.User.hasMany(exports.Post); // Un usuario puede tener muchos posts
// Organizacion.hasMany(Post); // Una organizacion puede tener muchos posts
exports.Post.belongsTo(user_model_1.User, { foreignKey: 'userId' });
// Post.belongsTo(Organizacion, {foreignKey: 'orgId'});
