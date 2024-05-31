
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user.model"; 
import { Post } from "./post.model";

export const Like = sequelize.define('postlike',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
},
{
timestamps: false
});


User.hasMany(Like); 
Like.belongsTo(User, { foreignKey: 'userId'});

Post.hasMany(Like); // Un usuario puede tener muchos foros
Like.belongsTo(Post, { foreignKey: 'postId'});