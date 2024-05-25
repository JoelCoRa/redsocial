import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";

export const Apoyo = sequelize.define('solicitud-apoyo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    correo:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaSolicitud: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false // Desactivar createdAt y updatedAt
});
User.hasMany(Apoyo); // Un usuario puede tener muchos posts
Apoyo.belongsTo(User, {foreignKey: 'userId'});
