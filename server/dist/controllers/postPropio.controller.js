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
exports.getPostsPropios = void 0;
const { QueryTypes } = require('sequelize');
// import sequelize from "sequelize/types/sequelize";
const connection_1 = __importDefault(require("../db/connection"));
const getPostsPropios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPostPropios = yield connection_1.default.query('SELECT posts.id AS idPost, posts.contenido, posts.fechaPublicacion, posts.likes, posts.comentarios, posts.reportes, users.nombreUsuario FROM POSTS INNER JOIN users ON posts.userId = users.id;', { type: QueryTypes.SELECT });
    // console.log(JSON.stringify(listPostPropios[0]))
    res.json(listPostPropios);
    // res.json({
    //     msg: "Get Products"
    // })
});
exports.getPostsPropios = getPostsPropios;
