
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 
import { Organizacion } from "./organizacion.model";

export const Recurso = sequelize.define('resource', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    autor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    link:{
        type: DataTypes.STRING, 
        allowNull: false
    },
});
User.hasMany(Recurso); // Un usuario puede tener muchos recursos
Organizacion.hasMany(Recurso); // Unaorganizacion puede tener muchos recursos

Recurso.belongsTo(User);
Recurso.belongsTo(Organizacion);