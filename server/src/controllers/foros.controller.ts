import { Request, Response } from "express"
import sequelize from "../db/connection";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { Foro } from "../models/foro.model";
import { ReplicaForo } from "../models/replicaforo.model";


export const crearForo = async(req: Request, res: Response) =>{
    const {titulo, etiqueta, contenido, userId, anonimo } = req.body;

    try {
        Foro.create({
            titulo: titulo,
            etiqueta: etiqueta,
            contenido: contenido,
            anonimo: anonimo,
            userId: userId
        })
    } catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Foro creado exitosamente!`,
    });
}

export const deleteForo = async(req:Request, res: Response) =>{
    const{ id } = req.params
}

export const getForo = async(req:Request, res: Response)=> {
    const {id} = req.params
    console.log(id)

    // const user = await Foro.findOne({
    //     where: {
    //         id: id
    //     },
    //     attributes: [
    //         'id','titulo','etiqueta','contenido', 'anonimo','userId','likes'
    //     ],
    //     include: [ 
    //         {
    //             model: User,
    //             attributes: ['nombreUsuario'],
    //             required: true
    //         },
    //         {
    //             model: ReplicaForo,                
    //             required: true
    //         }
    //     ]       
    // });
    const user = await sequelize.query('SELECT forums.id, forums.titulo, forums.userId, forums.updatedAt, forums.userId, forums.anonimo, forums.etiqueta, forums.contenido, users.nombreUsuario, users.imgPerfil, replicaforos.id, replicaforos.contenidoreplica, replicaforos.createdAt, replicaforos.userId, replicaforos.forumId  FROM forums INNER JOIN users ON forums.userId = users.id INNER JOIN replicaforos ON forums.id=replicaforos.forumId where forums.id = ?', {type: QueryTypes.SELECT, replacements: [id]})
    res.json(user);
}
export const getReplicasForo = async(req: Request, res: Response)=>{
    const {id} = req.params
    console.log(id)

    // const replicas = await ReplicaForo.findAll({
    //     where: {
    //         forumId: id
    //     },
    //     include: {
    //         model:User,
    //         attributes:['nombreUsuario', 'imgPerfil'],
    //         required: true
    //     }
    // })
    const replicas = await sequelize.query('Select replicaforos.id, replicaforos.contenidoreplica, replicaforos.createdAt, replicaforos.userId, replicaforos.forumId, users.nombreUsuario, users.imgPerfil FROM replicaforos INNER JOIN users ON replicaforos.userId = users.id where replicaforos.forumId = ?', {type: QueryTypes.SELECT, replacements: [id]})
    res.json(replicas);
}
export const getAllForos = async(req:Request, res: Response)=>{
    const foros = await Foro.findAll({
        include: {
            model: User,
            attributes: ['nombreUsuario', 'imgPerfil'],
            required: true
        }
    })
    res.json(foros);

}
export const searchForo = async(req: Request, res: Response) =>{
    const query = req.query.q;
    if (query) {
        const results = await Foro.findAll({
            where: {
                [Op.or]: [
                    { titulo: { [Op.like]: `%${query}%` } } // Búsqueda por nombre
                ]
            },
            include: {
                model: User,
                attributes: ['nombreUsuario', 'imgPerfil'],
                required: true
            }
        })
        res.json(results);
    } else {
        const items = await Foro.findAll();

        res.json(items);
    }
}

export const searchForoAux = async(req: Request, res: Response) =>{
    const { query } = req.query;
  try {
    const foros = await Foro.findAll({
      where: {
        [Op.or]: [
            { titulo: { [Op.like]: `%${query}%` } } // Búsqueda por nombre
        ]
      }
    });
    res.json(foros);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al buscar los datos.' });
  }
}