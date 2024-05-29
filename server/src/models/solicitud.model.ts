
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";

export const Solicitud = sequelize.define('request', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mensaje:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    fechaContacto:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')     }, 
},
{
    timestamps: false
});

User.hasMany(Solicitud); // Un usuario puede tener muchos posts
Solicitud.belongsTo(User);