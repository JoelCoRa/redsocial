import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";



export const Contacto = sequelize.define('solicitud-contacto', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    asunto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false // Desactivar createdAt y updatedAt
})
User.hasMany(Contacto); // Un usuario puede tener muchos posts
Contacto.belongsTo(User, {foreignKey: 'userId'});

