import { Request, Response } from "express"
import { User } from "../models/user.model";
import { Op } from "sequelize";
import { Contacto } from "../models/contacto.model";
import { Apoyo } from "../models/apoyo.model";
import { Reporte } from "../models/reporte.model";
import { Solicitud } from "../models/solicitud.model";
import { ContactoGeneral } from "../models/contactoportal.model";

export const getAllUsers = async(req:Request, res: Response)=>{
    const { id } = req.params;
    const excludedId = id;
    try {
        const users =  await User.findAll({
            where: {
                id: {
                    [Op.ne]: excludedId  // Op.ne es el operador "not equal"
                }
            },
            attributes: [
                'id','nombre','correo','nombreUsuario','tipoUsuario', 'isBlocked'
            ]
        });
        res.json(users)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
export const deleteUser = async(req: Request, res: Response) =>{
    const { id } = req.params;
    console.log(req.params)
    try{        
        User.destroy({
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
        msg: `Usuario eliminado exitosamente!`,
    });
}
export const updateAdmin = async(req: Request, res: Response) =>{
    const { id } = req.params;
    const { tipoUsuario } = req.body;

    try {
        User.update(
            {tipoUsuario: tipoUsuario },
            {where: { id: id }}
        )
    } catch(error){
        res.status(400).json({
        msg: "Oops ocurrio un error!",
        error
        });
    } 
    res.json({
        msg: `Tipo de usuario actualizado exitosamente!`,
    });
}
export const updateBlocked = async(req:Request, res: Response) =>{
    const { id } = req.params;
    const { isBlocked } = req.body;

    try {
        User.update(
            {isBlocked: isBlocked },
            {where: { id: id }}
        )
    } catch(error){
        res.status(400).json({
        msg: "Oops ocurrio un error!",
        error
        });
    } 
    res.json({
        msg: `Usuario actualizado exitosamente!`,
    });
}
export const getAllContactos = async(req:Request, res: Response) =>{
    const { id } = req.params;

    try {
        const contactos =  await Contacto.findAll({         
            
        });
        res.json(contactos)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 

}

export const getAllSolicitudes = async(req:Request, res: Response) =>{
    try {
        const solicitudesPortal =  await ContactoGeneral.findAll({   
      
        });
        res.json(solicitudesPortal)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
export const getAllReportes = async(req:Request, res: Response)=>{
    try {
        const reportes =  await Reporte.findAll({    
            include: {
                model: User,
                attributes: ['nombreUsuario'],
                required: true
            }        
        
        });
        res.json(reportes)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
export const getContacto = async(req: Request, res: Response)=>{
    const { id } = req.params
    try {
        const solicitud =  await Contacto.findOne({                
            include: {
                model: User,
                required: true,
                attributes: ['nombreUsuario']
            },
            where:{id: id}     
        });
        res.json(solicitud)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
export const getSolicitud = async(req: Request, res: Response)=>{
    const { id } = req.params
    try {
        const solicitud =  await ContactoGeneral.findOne({    
            where:{id: id}       
        });
        res.json(solicitud)
    }  catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
}
