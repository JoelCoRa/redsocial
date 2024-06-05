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
exports.createContactPortal = exports.createContact = void 0;
const contacto_model_1 = require("../models/contacto.model");
const contactoportal_model_1 = require("../models/contactoportal.model");
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { asunto, descripcion, userId } = req.body;
    try {
        contacto_model_1.Contacto.create({
            asunto: asunto,
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
        msg: `Solicitud de contacto creada exitosamente!`,
    });
});
exports.createContact = createContact;
const createContactPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, asunto, descripcion } = req.body;
    try {
        contactoportal_model_1.ContactoGeneral.create({
            correo: correo,
            asunto: asunto,
            descripcion: descripcion,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Solicitud de contacto creada exitosamente, te contactearemos lo más pronto posible!`,
    });
});
exports.createContactPortal = createContactPortal;
