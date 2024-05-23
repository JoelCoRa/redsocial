
import { Request, Response } from "express"
import sequelize from "../db/connection";
import  bcrypt  from 'bcrypt'

import { Op, QueryTypes } from "sequelize";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { SeguidoSeguidor } from "../models/seguidosseguidores.model";



export const getUserAjustes = async(req:Request, res:Response) =>{
    const { id } = req.params

    const user = await User.findOne({
        where: {
            id:id
        }
    });
    res.json(user)

}


// export const updateUser = async(req:Request, res: Response) =>{
//     const { id } = req.params
//     const { nombreUsuario, correo, validatePassword } = req.body
//     // const hashedPassword = await bcrypt.hash(password, 10);
    

//     try {
//         const user = await User.findOne({where:{ id: id }});
//         console.log(user?.dataValues.password);
        

//         //  Si el usuario no existe, devolver un error 404
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
//         }

//         // Verificar si el nombre de usuario o el correo ya existen en otros usuarios
//         const existingUser = await User.findOne({
//             where: {
//             [Op.or]: [{ nombreUsuario }, { correo }],
//             id: { [Op.ne]: id } // Asegurarse de que no sea el mismo usuario
//             }
//         });
//         if (existingUser) {
//             return res.status(400).json({
//               success: false,
//               message: 'Ya existe un usuario con ese nombre de usuario o correo, intenta de nuevo'
//             });
//         }
//         const isPasswordCorrect = await bcrypt.compare(validatePassword, user?.dataValues.password);
//         if (!isPasswordCorrect) {
//             return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
//         }else{
//             console.log('Correcta')
//         }

        

        
//         User.update(
//             {nombreUsuario: nombreUsuario, correo: correo},
//             {where: { id: id }}
//         )
//     } catch(error){
//         res.status(400).json({
//         msg: "Oops ocurrio un error!",
//         error
//         });
//     } 
//     res.json({
//         msg: `Información actualizada exitosamente!`,
//     });
// }

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombreUsuario, correo, password } = req.body;

    try {
        // Buscar el usuario por id
        const user = await User.findOne({ where: { id:id } });

        // Si el usuario no existe, devolver un error 404
        if (!user) {
            return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual del usuario
        const isPasswordCorrect = await bcrypt.compare(password, user?.dataValues.password);
        if (!isPasswordCorrect) {   
            return res.status(401).json({ success: false, msg: 'Contraseña incorrecta, intentalo de nuevo' });
        }
        
        // Verificar si el nombre de usuario o el correo ya existen en otros usuarios
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ nombreUsuario }, { correo }],
                id: { [Op.ne]: id } // Asegurarse de que no sea el mismo usuario
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: 'Ya existe un usuario con ese nombre de usuario o correo, intenta de nuevo'
            });
        }

        // Actualizar el nombre de usuario y el correo
        await User.update(
            { nombreUsuario, correo },
            { where: { id } }
        );

        // Responder con éxito
        return res.json({
            success: true,
            msg: 'Información actualizada exitosamente!'
        });

    } catch (error) {
        // Manejar errores
        return res.status(500).json({
            success: false,
            msg: 'Oops ocurrió un error!',
            error
        });
    }
};

export const updatePassword = async(req:Request, res: Response) =>{
    const { id } = req.params
    const { password, validatePassword  } = req.body
    try {
        const user = await User.findOne({ where: { id:id } });
        const isPasswordCorrect = await bcrypt.compare(validatePassword, user?.dataValues.password);
        if (!isPasswordCorrect) {   
            return res.status(401).json({ success: false, msg: 'Contraseña incorrecta, intentalo de nuevo' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword); 
        

        User.update(
            {password: hashedPassword},
            {where: { id: id }}
        )
    } catch(error){
        res.status(400).json({
        msg: "Oops ocurrio un error!",
        error
        });
    } 
    res.json({
        msg: `Password actualizada exitosamente!`,
    });
    


}