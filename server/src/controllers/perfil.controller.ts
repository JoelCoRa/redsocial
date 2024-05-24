import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes, Sequelize } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";

export const getPosts = async (req: Request, res: Response) =>{    
    const { id } = req.params;
    const listPosts = await Post.findAll({
        where: {
            userId: id
        },
        attributes: [
            'id','contenido','fechaPublicacion','likes','dislikes'
        ],
        order: [['fechaPublicacion', 'DESC']]
    });
    res.json(listPosts);
}
export const getUser = async (req: Request, res: Response) =>{
    const {id} = req.params
    console.log(id)

    const user = await User.findOne({
        where: {
            id: id
        },
        attributes: [
            'id','nombreUsuario','descripcion','cuentasSeguidas', 'seguidores','imgPerfil', 'tipoUsuario'
        ]
    });
    res.json(user);
}
export const countPosts = async(req: Request, res: Response) => {
    const { id } = req.params;
    const totalPosts = await Post.count({
        where: {
            userId: id
        }
    });
    console.log(totalPosts)
    res.json(totalPosts);
}
export const countSeguidos = async(req:Request, res:Response)=>{
    const { id } = req.params;

    const totSeguidos = await SeguidoSeguidor.count({
        where: {
            userIdSeguidor: id
        }
    })
    console.log(totSeguidos)
    res.json(totSeguidos);
}
export const countSeguidores = async(req:Request, res:Response)=>{
    const { id } = req.params;

    const totSeguidores = await SeguidoSeguidor.count({
        where: {
            userIdSeguido: id
        }
    })
    console.log(totSeguidores)
    res.json(totSeguidores);
}
export const cuentasSeguidas = async(req: Request, res: Response) => {
    const { id } = req.params;


    // const seguidos = await SeguidoSeguidor.findAll({
    //     where:{ 
    //         userIdSeguidor: id
    //     }
    // })



    const seguidos = await sequelize.query('Select seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor, users.imgPerfil from seguidosseguidores JOIN users ON seguidosseguidores.userIdSeguido = users.id where userIdSeguidor = ?', {type: QueryTypes.SELECT, replacements: [id]});

    res.json(seguidos);
}
export const cuentasSeguidores = async(req: Request, res: Response) => {
    const { id } = req.params;

    // const seguidores = await SeguidoSeguidor.findAll({
    //     where:{ 
    //         userIdSeguido: id
    //     }
    // })
    const seguidores = await sequelize.query('Select seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor, users.imgPerfil from seguidosseguidores JOIN users ON seguidosseguidores.userIdSeguidor = users.id where userIdSeguido = ?', {type: QueryTypes.SELECT, replacements: [id]});



    // const seguidos = await sequelize.query('Select userIdSeguido, userIdSeguidor, nombreUserSeguido, nombreUserSeguidor from seguidosseguidores where userIdSeguido = ?', {type: QueryTypes.SELECT, replacements: [id]});

    res.json(seguidores);
}
export const createPost = async(req: Request, res: Response) =>{
    const { contenido, userId } = req.body
    // console.log(req.body);
    try{        
        Post.create({
            contenido: contenido,
            userId: userId
        });
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Publicación creada exitosamente!`,
    });
}
export const deletePost = async(req: Request, res: Response) =>{
    const { id } = req.params;
    console.log(req.params)
    try{        
        Post.destroy({
            where: {
                id: id
            }
        });
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Publicación eliminada exitosamente!`,
    });
}
export const deleteSeguidor = async(req:Request, res: Response) =>{
    const { seguidoId, seguidorId  } = req.params;

    try{
        await SeguidoSeguidor.destroy({
            where :{
                userIdSeguido: seguidoId,
                userIdSeguidor: seguidorId,                
            }
        })
        // await sequelize.query(`Delete from seguidosseguidores where userIdSeguido = ${seguidoId} AND userIdSeguidor = ${seguidorId}`)
    }
    catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Has dejado seguir al usuario!`,
    });
}
export const addSeguidor = async(req:Request, res: Response) =>{
    const { userIdSeguido, userIdSeguidor, nombreUserSeguido, nombreUserSeguidor  } = req.body;

    const seg = userIdSeguido;
    console.log(seg)

    try {
        SeguidoSeguidor.create({
            userIdSeguido: userIdSeguido,
            userIdSeguidor: userIdSeguidor,
            nombreUserSeguido: nombreUserSeguido,
            nombreUserSeguidor: nombreUserSeguidor,
        });
        
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Has seguido a este usuario!`,
    });

}
export const getSeguidos = async(req:Request, res: Response)=>{
    const {id} = req.params;
    console.log(id)

    const user = await SeguidoSeguidor.findAll({
        where: {
            userIdSeguidor: id
        },        
    });
    res.json(user);    
}
export const getSeguidores = async(req:Request, res: Response)=>{
    const {id} = req.params;
    console.log(id)

    const user = await SeguidoSeguidor.findAll({
        where: {
            userIdSeguido: id
        },        
    });
    res.json(user);    
}

export const addImgPerfil = async(req: Request, res: Response) =>{
    const { id } = req.params
    const { imgPerfil } = req.body;

    try{
        await User.update(
            {imgPerfil: imgPerfil},{ where: {id: id}});
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Foto actualizada exitosamente!`,
    });    
}

// export const addLike = async(req: Request, res: Response) =>{
//     const { id } = req.params;
//     const { likes } = req.body;

//     console.log(id)
//     console.log(req.body)
//     const likesActuales = likes;
//     console.log(likesActuales)
//     try{        
//         Post.update(
//             { likes:  likesActuales},{
//             where: {
//                 id: id
//             }
//         });
//     }catch(error){
//         res.status(400).json({
//             msg: "Oops ocurrio un error!",
//             error
//         });
//     } 
//     res.json({
//         msg: `Publicación likeada exitosamente!`,
//     });
// }






export const getLikes = async(req: Request, res: Response) =>{
    const { id } = req.params;
    const seguidos = await sequelize.query('Select postid, userid from Likes where postid = ?', {type: QueryTypes.SELECT, replacements: [id]});   
    res.json(seguidos) 
}

export const updateDescripcion = async(req: Request, res: Response) =>{
    const { id } = req.params
    const { descripcion } = req.body

    try {
        User.update(
            {descripcion: descripcion},
            {where: { id: id }}
            )
    } catch(error){
        res.status(400).json({
        msg: "Oops ocurrio un error!",
        error
        });
    } 
    res.json({
        msg: `Descripción actualizada exitosamente!`,
    });
}
