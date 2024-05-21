import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes, Sequelize } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";
const { Op } = require('sequelize');

export const searchComunidad = async(req: Request, res: Response) =>{
    const query = req.query.q;
  if (query) {

    const results = await User.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `%${query}%` } }, // Búsqueda por nombre
                { nombreUsuario: { [Op.like]: `%${query}%` } } // Búsqueda por descripción
              ]
        }
    })
    res.json(results);
  } else {
    const items = await User.findAll();

    res.json(items);
  }
}

