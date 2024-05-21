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
exports.crearForo = void 0;
const foro_model_1 = require("../models/foro.model");
const crearForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, etiqueta, contenido, userId } = req.body;
    try {
        foro_model_1.Foro.create({
            titulo: titulo,
            etiqueta: etiqueta,
            contenido: contenido,
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
        msg: `Foro creado exitosamente!`,
    });
});
exports.crearForo = crearForo;
