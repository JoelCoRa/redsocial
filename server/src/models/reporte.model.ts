

import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";
import { Post } from "./post.model";

export const Reporte = sequelize.define('report', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaContacto:{
        type: DataTypes.DATE,
        allowNull: false
    }, 
    fechaSolicitud: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaRespuesta: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

User.hasMany(Reporte); // Un usuario puede tener muchos posts
Post.hasMany(Reporte)
Reporte.belongsTo(User);
Reporte.belongsTo(Post);