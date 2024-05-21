import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes, Sequelize } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { Foro } from "../models/foro.model";


export const crearForo = async(req: Request, res: Response) =>{
    const {titulo, etiqueta, contenido, userId } = req.body;

    try {
        Foro.create({
            titulo: titulo,
            etiqueta: etiqueta,
            contenido: contenido,
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