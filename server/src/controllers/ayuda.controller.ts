import { Request, Response } from "express"
import sequelize from "../db/connection";
import { Apoyo } from "../models/apoyo.model";

export const createSolicitudApoyo = (req: Request, res: Response) =>{
    const {correo, descripcion, userId} = req.body;
    try{        
        Apoyo.create({
            correo: correo,
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
        msg: `Solicitud de apoyo creada exitosamente!`,
    });
}