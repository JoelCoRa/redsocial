import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 

export const Post = sequelize.define('post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenido:{
        type: DataTypes.STRING,
        defaultValue: ""
    }, 
    fechaPublicacion:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comentarios:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
},{timestamps: false});
User.hasMany(Post); // Un usuario puede tener muchos posts
Post.belongsTo(User, {foreignKey: 'userId'});
