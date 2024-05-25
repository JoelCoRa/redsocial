import { Request, Response } from "express"
import sequelize from "../db/connection";
import { QueryTypes, Sequelize } from "sequelize";
import { Contacto } from "../models/contacto.model";


export const createContact = async(req: Request, res: Response) => {
    const {rol, asunto, descripcion, userId} = req.body;

    try{        
        Contacto.create({
            rol: rol,
            asunto: asunto,
            descripcion: descripcion, 
            userId: userId
        });
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Solicitud de contacto creada exitosamente!`,
    });
}