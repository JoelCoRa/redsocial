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
exports.resetPassword = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../config/mailer");
const nodemailer = require('nodemailer');
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, fechaNacimiento, sexo, correo, nombreUsuario, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_model_1.User.findOne({ where: { nombreUsuario: nombreUsuario } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el username ${nombreUsuario}`
        });
    }
    try {
        // Se guarda el Usuario en la BD
        yield user_model_1.User.create({
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
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
        console.log(error);
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreUsuario, password } = req.body;
    console.log(nombreUsuario);
    const user = yield user_model_1.User.findOne({ where: { nombreUsuario: nombreUsuario } });
    if (!user) {
        return res.status(400).json({
            msg: `Parece que el usuario ${nombreUsuario} aun no se encuentra registrado`
        });
    }
    if (user && user.isBlocked === true) {
        return res.status(400).json({
            msg: `Parece que el usuario ${nombreUsuario} se encuentra bloqueado, ponte en contacto con el Administrador`
        });
    }
    // Se valida el password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `La contraseña es incorrecta!`
        });
    }
    // Se genera el token
    const token = jsonwebtoken_1.default.sign({
        nombreUsuario: nombreUsuario,
        idUser: user.id,
        // tipo: user.tipoUsuario
    }, process.env.SECRET_KEY || 'pepito123');
    // console.log(token);
    res.json(token);
});
exports.loginUser = loginUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    console.log(correo);
    const user = user_model_1.User.findOne({ where: { correo: correo } });
    if (!user) {
        return res.status(404).json({
            msg: 'Ese correo no está registrado, intentalo de nuevo!'
        });
    }
    const newPassword = genRandomPass();
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    // Cuerpo del correo
    const mailData = {
        to: correo,
        subject: "Recuperacion de Contraseña",
        html: `Hola, tu nueva contraseña es <strong>${newPassword}</strong>. Te recomendamos cambiarla en la sección Ajustes. De otra forma, conserva esta contraseña. <br>
      Si no lo solciitaste ignora este correo.`,
    };
    try {
        yield user_model_1.User.update({ password: hashedPassword }, { where: { correo: correo } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Correo enviado exitosamente!`,
    });
    mailer_1.transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ msg: "mail send", msg_id: info.messageId });
    });
});
exports.resetPassword = resetPassword;
/**Funcion para generar una contraseña random */
const genRandomPass = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomStr += chars.charAt(randomIndex);
    }
    return randomStr;
};
