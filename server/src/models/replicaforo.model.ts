
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 
import { Foro } from "./foro.model";

export const ReplicaForo = sequelize.define('replicaforo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },    
    contenidoreplica:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaCreado:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }    
},
{
    timestamps: false
});
User.hasMany(ReplicaForo); // Un usuario puede tener muchos foros
ReplicaForo.belongsTo(User, { foreignKey: 'userId'});

Foro.hasMany(ReplicaForo);
ReplicaForo.belongsTo(Foro, { foreignKey: 'forumId'});