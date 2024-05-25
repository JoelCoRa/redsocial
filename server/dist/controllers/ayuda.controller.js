"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolicitudApoyo = void 0;
const apoyo_model_1 = require("../models/apoyo.model");
const createSolicitudApoyo = (req, res) => {
    const { correo, descripcion, userId } = req.body;
    try {
        apoyo_model_1.Apoyo.create({
            correo: correo,
            descripcion: descripcion,
            userId: userId
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Solicitud de apoyo creada exitosamente!`,
    });
};
exports.createSolicitudApoyo = createSolicitudApoyo;
