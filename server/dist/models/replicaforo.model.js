"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplicaForo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_model_1 = require("./user.model");
const foro_model_1 = require("./foro.model");
exports.ReplicaForo = connection_1.default.define('replicaforo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenidoreplica: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaCreado: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: connection_1.default.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
});
user_model_1.User.hasMany(exports.ReplicaForo); // Un usuario puede tener muchos foros
exports.ReplicaForo.belongsTo(user_model_1.User, { foreignKey: 'userId' });
foro_model_1.Foro.hasMany(exports.ReplicaForo);
exports.ReplicaForo.belongsTo(foro_model_1.Foro, { foreignKey: 'forumId' });
