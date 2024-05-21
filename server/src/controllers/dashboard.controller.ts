
import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";

export const getPostsSeg = async (req: Request, res: Response) =>{
    const {id} =req.params;


    // const listPostsSeguidos = Post.findAll({
    //     include: [
    //         {
    //             model: SeguidoSeguidor,
    //             as: 'seguidosseguidores',
    //             required: true,
    //         },
    //         {
    //             model: User,
    //             required: true,
    //             as: 'users',
    //             attributes: ['imgPerfil']
    //         }           
    //     ],
    //     where: {
    //         userId: id
    //     }
    // })

    const listPostsSeguidos = await sequelize.query('SELECT posts.id, posts.contenido, posts.userId, posts.fechaPublicacion, seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor ,users.imgPerfil FROM posts inner join seguidosseguidores on posts.userId = seguidosseguidores.userIdSeguido INNER JOIN users on posts.userId = users.id where seguidosseguidores.userIdSeguidor = ? ORDER BY posts.fechaPublicacion DESC;', {type: QueryTypes.SELECT, replacements: [id]});
    res.json(listPostsSeguidos);
}