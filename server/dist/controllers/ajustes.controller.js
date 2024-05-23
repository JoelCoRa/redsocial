"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateUser = exports.getUserAjustes = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user.model");
const getUserAjustes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findOne({
        where: {
            id: id
        }
    });
    res.json(user);
});
exports.getUserAjustes = getUserAjustes;
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombreUsuario, correo, password } = req.body;
    try {
        // Buscar el usuario por id
        const user = yield user_model_1.User.findOne({ where: { id: id } });
        // Si el usuario no existe, devolver un error 404
        if (!user) {
            return res.status(404).json({ success: false, msg: 'Usuario no encontrado' });
        }
        // Verificar la contraseña actual del usuario
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: 'Contraseña incorrecta, intentalo de nuevo' });
        }
        // Verificar si el nombre de usuario o el correo ya existen en otros usuarios
        const existingUser = yield user_model_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ nombreUsuario }, { correo }],
                id: { [sequelize_1.Op.ne]: id } // Asegurarse de que no sea el mismo usuario
            }
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: 'Ya existe un usuario con ese nombre de usuario o correo, intenta de nuevo'
            });
        }
        // Actualizar el nombre de usuario y el correo
        yield user_model_1.User.update({ nombreUsuario, correo }, { where: { id } });
        // Responder con éxito
        return res.json({
            success: true,
            msg: 'Información actualizada exitosamente!'
        });
    }
    catch (error) {
        // Manejar errores
        return res.status(500).json({
            success: false,
            msg: 'Oops ocurrió un error!',
            error
        });
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password, validatePassword } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ where: { id: id } });
        const isPasswordCorrect = yield bcrypt_1.default.compare(validatePassword, user === null || user === void 0 ? void 0 : user.dataValues.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: 'Contraseña incorrecta, intentalo de nuevo' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedPassword);
        user_model_1.User.update({ password: hashedPassword }, { where: { id: id } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Password actualizada exitosamente!`,
    });
});
exports.updatePassword = updatePassword;
