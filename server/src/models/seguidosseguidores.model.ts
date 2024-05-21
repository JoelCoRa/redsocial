
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const SeguidoSeguidor = sequelize.define('seguidosseguidores',{
    idEntry: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userIdSeguido: {
        type: DataTypes.INTEGER,
    },
    userIdSeguidor:{
        type: DataTypes.INTEGER,
    },
    nombreUserSeguido:{
        type: DataTypes.INTEGER,    
    },
    nombreUserSeguidor:{
        type: DataTypes.INTEGER,    
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: true 
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: true 
    }
})