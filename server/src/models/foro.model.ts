
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 

export const Foro = sequelize.define('forum', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    ultimaActividad:{
        type: DataTypes.DATE,
    },
    contenido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    etiqueta:{
        type: DataTypes.STRING,
        allowNull: false
    },
    anonimo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fechaCreacion:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }    
},{timestamps: false});
User.hasMany(Foro); // Un usuario puede tener muchos foros
Foro.belongsTo(User, { foreignKey: 'userId'});