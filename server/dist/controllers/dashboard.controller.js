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
exports.getPostsSeg = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const getPostsSeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const listPostsSeguidos = Post.findAll({
    //     include: [
    //         {
    //             model: SeguidoSeguidor,
    //             as: 'seguidosseguidores',
    //             required: true,
    //         },
    //         {
    //             model: User,
    //             required: true,
    //             as: 'users',
    //             attributes: ['imgPerfil']
    //         }           
    //     ],
    //     where: {
    //         userId: id
    //     }
    // })
    const listPostsSeguidos = yield connection_1.default.query('SELECT posts.id, posts.contenido, posts.userId, posts.fechaPublicacion, seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor ,users.imgPerfil FROM posts inner join seguidosseguidores on posts.userId = seguidosseguidores.userIdSeguido INNER JOIN users on posts.userId = users.id where seguidosseguidores.userIdSeguidor = ? ORDER BY posts.fechaPublicacion DESC;', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    res.json(listPostsSeguidos);
});
exports.getPostsSeg = getPostsSeg;
