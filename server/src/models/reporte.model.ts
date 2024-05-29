

import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model";
import { Post } from "./post.model";
import { Foro } from "./foro.model";

export const Reporte = sequelize.define('report', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaReporte:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP') 
    }
},{timestamps:false});

User.hasMany(Reporte); // Un usuario puede tener muchos posts
Foro.hasMany(Reporte)
Reporte.belongsTo(User,{foreignKey: 'userId'});
Reporte.belongsTo(Foro, { foreignKey: 'forumId'});