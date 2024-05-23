
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 
import { Foro } from "./foro.model";

export const ReplicaForo = sequelize.define('replicaforo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },    
    contenidoreplica:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
});
User.hasMany(ReplicaForo); // Un usuario puede tener muchos foros
Foro.hasMany(ReplicaForo);
ReplicaForo.belongsTo(User, { foreignKey: 'userId'});
ReplicaForo.belongsTo(Foro, { foreignKey: 'forumid'});