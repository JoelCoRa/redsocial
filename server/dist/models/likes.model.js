"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const post_model_1 = require("./post.model");
exports.Like = connection_1.default.define('postlike', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    timestamps: false
});
user_model_1.User.hasMany(exports.Like);
exports.Like.belongsTo(user_model_1.User, { foreignKey: 'userId' });
post_model_1.Post.hasMany(exports.Like); // Un usuario puede tener muchos foros
exports.Like.belongsTo(post_model_1.Post, { foreignKey: 'postId' });
