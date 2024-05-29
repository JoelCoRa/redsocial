import {Request, Response} from 'express';
import  bcrypt  from 'bcrypt'
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { QueryTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connection';
import { transporter } from '../config/mailer';
const nodemailer = require('nodemailer');

export const newUser = async (req: Request, res: Response) => {
    const {nombre, apellido, fechaNacimiento, sexo, correo, nombreUsuario, password} = req.body;    
    const hashedPassword = await bcrypt.hash(password, 10);
    // Se valida si el usuario existe en la BD
    const user = await User.findOne({where:{ nombreUsuario: nombreUsuario }});
    // const org = await Organizacion.findOne({where:{ correo: correo }});
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el username ${nombreUsuario}`            
        });
    } 
    // if(org){
    //     return res.status(400).json({
    //         msg: `Ya existe una organización registrada con ese correo.`
    //     });
    // }
    try{
        // Se guarda el Usuario en la BD
        await User.create({
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            sexo: sexo,
            correo: correo,        
            nombreUsuario: nombreUsuario,
            password: hashedPassword,
        });
        res.json({
            msg: `Usuario ${nombreUsuario} creado exitosamente!`,
        })
    } catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
        console.log(error)
    }    
    
}
export const loginUser = async (req: Request, res: Response) => {
    const {nombreUsuario, password} = req.body;
    console.log(nombreUsuario);

    const user:any = await User.findOne({where: {nombreUsuario: nombreUsuario}});
    if(!user){
        return res.status(400).json({
            msg: `Parece que el usuario ${nombreUsuario} aun no se encuentra registrado`
        });
    }
    if(user && user.isBlocked === true){
        return res.status(400).json({
            msg: `Parece que el usuario ${nombreUsuario} se encuentra bloqueado, ponte en contacto con el Administrador`
        });
    }
    // Se valida el password
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid){
        return res.status(400).json({
            msg: `La contraseña es incorrecta!`
        })
    }
    // Se genera el token
    const token =  jwt.sign({
        nombreUsuario: nombreUsuario,
        idUser: user.id,
        // tipo: user.tipoUsuario
    }, process.env.SECRET_KEY || 'pepito123');
    // console.log(token);
    res.json(token);   
}
export const resetPassword = async(req: Request, res: Response) =>{
    const { correo } = req.body;

    console.log(correo)

    const user = User.findOne({where: {correo: correo}})

    if(!user){
        return res.status(404).json({
            msg: 'No digasmamadas'
        });
    }

    const newPassword = genRandomPass();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cuerpo del correo
    const mailData = {
      to: correo,
      subject: "Recuperacion de Contraseña",
      html: `Hola, tu nueva contraseña es <strong>${newPassword}</strong>. Te recomendamos cambiarla en la sección Ajustes. De otra forma, conserva esta contraseña.`,
    };  
    try {
        await User.update(
            {password: hashedPassword}, {where: {correo: correo}})
    }catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    } 
    res.json({
        msg: `Correo enviado exitosamente!`,
    }); 

    





    
 
    transporter.sendMail(mailData, (error: any, info: { messageId: any; }) => {
      if (error) {
        return console.log(error);
      }
      res.status(200).send({ msg: "mail send", msg_id: info.messageId });
    });
}   
/**Funcion para generar una contrasenia random */
const genRandomPass = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomStr += chars.charAt(randomIndex);
    }
    return randomStr;
};



// export const loginOrganizacion = async (req: Request, res: Response) => {
//     const {correo, password} = req.body;
//     console.log(correo);

//     const org:any = await Organizacion.findOne({where: {correo: correo}});
//     if(!org){
//         return res.status(400).json({
//             msg: `Parece que no se ha registrado esa organización`
//         });
//     }
//     // Se valida el password
//     const passwordValid = await bcrypt.compare(password, org.password);

//     if(!passwordValid){
//         return res.status(400).json({
//             msg: `La contraseña es incorrecta!`
//         })
//     }
//     // Se genera el token
//     const token =  jwt.sign({
//         correo: correo,
//         idOrg: org.id,
//         // tipo: user.tipoUsuario
//     }, process.env.SECRET_KEY || 'pepito123');
//     // console.log(token);
//     res.json(token);   
// }

// export const newOrganizacion = async (req: Request, res: Response) => {
//     const {nombre, razonSocial, rfc, direccion, telefono, sector, correo,password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         const org = await Organizacion.findOne({ where: { correo: correo } });
//         const user = await User.findOne({where: {correo: correo}})
//         if (org || user) {
//             return res.status(400).json({
//                 msg: `Ya existe un usuario/organización, registrado con ese correo.`
//             });
//         } 

//         // Se guarda el Usuario en la BD
//         await Organizacion.create({
//             nombre: nombre,
//             rfc: rfc,
//             razonSocial: razonSocial,
//             direccion: direccion,
//             correo: correo,        
//             telefono: telefono,
//             sector: sector,
//             password: hashedPassword,
//         });

//         return res.json({
//             msg: `Organizacion ${nombre} registrada exitosamente!`,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             msg: "Oops ocurrio un error!",
//             error
//         });
//     }
// };