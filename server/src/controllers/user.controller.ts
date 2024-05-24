import {Request, Response} from 'express';
import  bcrypt  from 'bcrypt'
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { QueryTypes, Sequelize } from 'sequelize';
import sequelize from '../db/connection';
const nodemailer = require('nodemailer');

export const newUser = async (req: Request, res: Response) => {
    const {nombre, apellido, fechaNacimiento, sexo, correo, nombreUsuario, password} = req.body;    
    const hashedPassword = await bcrypt.hash(password, 10);
    // Se valida si el usuario existe en la BD
    const user = await User.findOne({where:{ nombreUsuario: nombreUsuario }});
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el username ${nombreUsuario}`            
        });
    } 
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
    } catch(error){
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }    
    res.json({
        msg: `Usuario ${nombreUsuario} creado exitosamente!`,
    })
}
export const loginUser = async (req: Request, res: Response) => {
    const {nombreUsuario, password} = req.body;
    console.log(nombreUsuario);

    const user:any = await User.findOne({where: {nombreUsuario: nombreUsuario}});
    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${nombreUsuario} en la BD`
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





// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'tuemail@gmail.com',
//       pass: 'tucontraseña'
//     }
// });
// export const reqRecoverPassword = async(req: Request, res: Response) =>{
//     const { email } = req.body;
//     const user:any = await User.findOne({ where: { email } });
//     if (!user) {
//         return res.status(404).json({
//             msg: 'Usuario no encontrado' 
//         });
//     }
//     const tokenReset = jwt.sign({ 
//         idUser: user.id,
//     }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '1h' });
//     user.resetToken = tokenReset;
//     await user.save();
    
//     const mailOptions = {
//         from: 'tuemail@gmail.com',
//         to: user.email,
//         subject: 'Recuperar Contraseña',
//         text: `Use this link to reset your password: http://localhost:4200/reset-password/${tokenReset}`
//     };
//     transporter.sendMail(mailOptions, (error: any, info: any) => {
//         if (error) {
//           return res.status(500).json({ msg: 'Error al enviar el correo' });
//         }
//         res.status(200).json({ msg: 'Correo enviado' });
//       });
// }

// export const recoverPassword = async(req: Request, res: Response) =>{
//     const { token, newPassword } = req.body;
//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.SECRET_KEY || 'pepito123');
//         if (typeof decoded === 'string' || !decoded.userId) {
//             return res.status(400).json({ message: 'Token inválido' });
//         }
//         const user = await User.findOne({ where: { id: decoded.userId, resetToken: token } });
//         if (!user) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
        
//         User.update(
//             {password: hashedPassword, resetToken: null}, {where: {id: decoded.userId}}
//         )
//         await user.save();
//         res.status(200).json({ message: 'Contraseña actualizada' });

//     } catch (err) {
//         return res.status(400).json({ message: 'Token inválido o expirado' });
//     }
    
// }



