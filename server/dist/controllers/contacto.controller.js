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
exports.createContact = void 0;
const contacto_model_1 = require("../models/contacto.model");
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol, asunto, descripcion, userId } = req.body;
    try {
        contacto_model_1.Contacto.create({
            rol: rol,
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
