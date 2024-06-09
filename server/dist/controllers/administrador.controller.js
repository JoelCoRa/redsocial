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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReportes = exports.getAllSolicitudes = exports.getAllContactos = exports.updateBlocked = exports.updateAdmin = exports.deleteUser = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const sequelize_1 = require("sequelize");
const contacto_model_1 = require("../models/contacto.model");
const apoyo_model_1 = require("../models/apoyo.model");
const reporte_model_1 = require("../models/reporte.model");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const excludedId = id;
    try {
        const users = yield user_model_1.User.findAll({
            where: {
                id: {
                    [sequelize_1.Op.ne]: excludedId // Op.ne es el operador "not equal"
                }
            },
            attributes: [
                'id', 'nombre', 'correo', 'nombreUsuario', 'tipoUsuario', 'isBlocked'
            ]
        });
        res.json(users);
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.params);
    try {
        user_model_1.User.destroy({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Usuario eliminado exitosamente!`,
    });
});
exports.deleteUser = deleteUser;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { tipoUsuario } = req.body;
    try {
        user_model_1.User.update({ tipoUsuario: tipoUsuario }, { where: { id: id } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Tipo de usuario actualizado exitosamente!`,
    });
});
exports.updateAdmin = updateAdmin;
const updateBlocked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isBlocked } = req.body;
    try {
        user_model_1.User.update({ isBlocked: isBlocked }, { where: { id: id } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Usuario actualizado exitosamente!`,
    });
});
exports.updateBlocked = updateBlocked;
const getAllContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contactos = yield contacto_model_1.Contacto.findAll({});
        res.json(contactos);
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
});
exports.getAllContactos = getAllContactos;
const getAllSolicitudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield apoyo_model_1.Apoyo.findAll({});
        res.json(solicitudes);
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
});
exports.getAllSolicitudes = getAllSolicitudes;
const getAllReportes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportes = yield reporte_model_1.Reporte.findAll({
            include: {
                model: user_model_1.User,
                attributes: ['nombreUsuario'],
                required: true
            }
        });
        res.json(reportes);
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
});
exports.getAllReportes = getAllReportes;
