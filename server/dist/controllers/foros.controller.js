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
exports.searchForoAux = exports.searchForo = exports.getAllForos = exports.getReplicasForo = exports.getForo = exports.deleteForo = exports.crearForo = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user.model");
const foro_model_1 = require("../models/foro.model");
const crearForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, etiqueta, contenido, userId, anonimo } = req.body;
    try {
        foro_model_1.Foro.create({
            titulo: titulo,
            etiqueta: etiqueta,
            contenido: contenido,
            anonimo: anonimo,
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
const deleteForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
});
exports.deleteForo = deleteForo;
const getForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    // const user = await Foro.findOne({
    //     where: {
    //         id: id
    //     },
    //     attributes: [
    //         'id','titulo','etiqueta','contenido', 'anonimo','userId','likes'
    //     ],
    //     include: [ 
    //         {
    //             model: User,
    //             attributes: ['nombreUsuario'],
    //             required: true
    //         },
    //         {
    //             model: ReplicaForo,                
    //             required: true
    //         }
    //     ]       
    // });
    const user = yield connection_1.default.query('SELECT forums.id, forums.titulo, forums.userId, forums.updatedAt, forums.userId, forums.anonimo, forums.etiqueta, forums.contenido, users.nombreUsuario, users.imgPerfil, replicaforos.id, replicaforos.contenidoreplica, replicaforos.createdAt, replicaforos.userId, replicaforos.forumId  FROM forums INNER JOIN users ON forums.userId = users.id INNER JOIN replicaforos ON forums.id=replicaforos.forumId where forums.id = ?', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    res.json(user);
});
exports.getForo = getForo;
const getReplicasForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    // const replicas = await ReplicaForo.findAll({
    //     where: {
    //         forumId: id
    //     },
    //     include: {
    //         model:User,
    //         attributes:['nombreUsuario', 'imgPerfil'],
    //         required: true
    //     }
    // })
    const replicas = yield connection_1.default.query('Select replicaforos.id, replicaforos.contenidoreplica, replicaforos.createdAt, replicaforos.userId, replicaforos.forumId, users.nombreUsuario, users.imgPerfil FROM replicaforos INNER JOIN users ON replicaforos.userId = users.id where replicaforos.forumId = ?', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    res.json(replicas);
});
exports.getReplicasForo = getReplicasForo;
const getAllForos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foros = yield foro_model_1.Foro.findAll({
        include: {
            model: user_model_1.User,
            attributes: ['nombreUsuario', 'imgPerfil'],
            required: true
        }
    });
    res.json(foros);
});
exports.getAllForos = getAllForos;
const searchForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (query) {
        const results = yield foro_model_1.Foro.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { titulo: { [sequelize_1.Op.like]: `%${query}%` } } // Búsqueda por nombre
                ]
            },
            include: {
                model: user_model_1.User,
                attributes: ['nombreUsuario', 'imgPerfil'],
                required: true
            }
        });
        res.json(results);
    }
    else {
        const items = yield foro_model_1.Foro.findAll();
        res.json(items);
    }
});
exports.searchForo = searchForo;
const searchForoAux = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const foros = yield foro_model_1.Foro.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { titulo: { [sequelize_1.Op.like]: `%${query}%` } } // Búsqueda por nombre
                ]
            }
        });
        res.json(foros);
    }
    catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al buscar los datos.' });
    }
});
exports.searchForoAux = searchForoAux;
