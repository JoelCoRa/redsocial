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
exports.searchComunidad = void 0;
const user_model_1 = require("../models/user.model");
const { Op } = require('sequelize');
const searchComunidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (query) {
        const results = yield user_model_1.User.findAll({
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${query}%` } }, // Búsqueda por nombre
                    { nombreUsuario: { [Op.like]: `%${query}%` } } // Búsqueda por descripción
                ]
            }
        });
        res.json(results);
    }
    else {
        const items = yield user_model_1.User.findAll();
        res.json(items);
    }
});
exports.searchComunidad = searchComunidad;
