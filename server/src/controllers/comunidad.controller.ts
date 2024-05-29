import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes, Sequelize } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";
const { Op } = require('sequelize');

export const searchComunidad = async(req: Request, res: Response) =>{
  const { id } = req.params  
  const query = req.query.q;
  const excludeId = id
  if (query) {
    const results = await User.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: excludeId } }, // Exclusión por ID
            {
                [Op.or]: [
                    { nombreUsuario: { [Op.like]: `%${query}%` } }, // Búsqueda por nombre de usuario
                ]
            }
          ]
        },
        attributes: ['id','nombreUsuario','descripcion','imgPerfil']
    })
    res.json(results);
  } else {
    const items = await User.findAll();

    res.json(items);
  }
}

