
import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";
import { Like } from "../models/likes.model";

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
export const addLike = async(req: Request, res: Response) =>{
    const { id } = req.params
    const {postId, userId} = req.body;
    try {
        await Like.create({
            postId: postId,
            userId: userId
        });
        res.json({
            msg: `Likeado exitosamente!`,
        });
    } catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
export const getLikes = async(req: Request, res: Response) =>{
    const {id} = req.params;

    const likes = await Like.findAll({
        where: {
            postId: id
        }
    });

    res.json(likes)
}
export const deleteLikes = async(req: Request, res: Response) =>{
    const {postId, userId} = req.params;
    console.log(req.params)
    try{        
        Like.destroy({
            where: {
                postId: postId,
                userId: userId
            }
        });
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Publicación deslikeada exitosamente!`,
    });
}

export const getLikesCurrentUser = async(req:Request, res: Response)=>{
    const { id } = req.params

    const likesUser = await Like.findAll({
        where: {
            useriD: id
        }
    });
    res.json(likesUser);
}
export const countLikesPost = async(req: Request, res: Response)=>{
    const { postId } = req.params;

    const totLikes = await Like.count({
        where: {postId: postId}
    });
    res.json(totLikes);
}