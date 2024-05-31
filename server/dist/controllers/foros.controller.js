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
exports.addReporte = exports.countReplicasForo = exports.createReplica = exports.searchForoAux = exports.searchForo = exports.getAllForos = exports.getReplicasForo = exports.getForo = exports.deleteForo = exports.crearForo = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user.model");
const foro_model_1 = require("../models/foro.model");
const replicaforo_model_1 = require("../models/replicaforo.model");
const reporte_model_1 = require("../models/reporte.model");
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
        res.json({
            msg: `Foro creado exitosamente!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
});
exports.crearForo = crearForo;
const deleteForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
});
exports.deleteForo = deleteForo;
const getForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const user = yield foro_model_1.Foro.findOne({
        where: {
            id: id
        },
        attributes: [
            'id', 'titulo', 'etiqueta', 'contenido', 'anonimo', 'userId'
        ],
        include: [
            {
                model: user_model_1.User,
                attributes: ['nombreUsuario', 'imgPerfil'],
                required: true
            },
        ]
    });
    // const user = await sequelize.query('SELECT forums.id, forums.titulo, forums.userId, forums.updatedAt, forums.userId, forums.anonimo, forums.etiqueta, forums.contenido, users.nombreUsuario, users.imgPerfil FROM forums INNER JOIN users ON forums.userId = users.id where forums.id = ?', {type: QueryTypes.SELECT, replacements: [id]})
    res.json(user);
});
exports.getForo = getForo;
const getReplicasForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const replicas = yield replicaforo_model_1.ReplicaForo.findAll({
        where: {
            forumId: id
        },
        include: {
            model: user_model_1.User,
            attributes: ['nombreUsuario', 'imgPerfil'],
            required: true
        },
        order: [
            ['fechaCreado', 'DESC'] // Ordena los resultados por el campo `fecha` en orden descendente
        ]
    });
    // const replicas = await sequelize.query('Select replicaforos.id, replicaforos.contenidoreplica, replicaforos.createdAt, replicaforos.userId, replicaforos.forumId, users.nombreUsuario, users.imgPerfil FROM replicaforos INNER JOIN users ON replicaforos.userId = users.id where replicaforos.forumId = ?', {type: QueryTypes.SELECT, replacements: [id]})
    res.json(replicas);
});
exports.getReplicasForo = getReplicasForo;
const getAllForos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foros = yield foro_model_1.Foro.findAll({
        include: {
            model: user_model_1.User,
            attributes: ['nombreUsuario'],
            required: true
        },
        attributes: ['id', 'titulo', 'contenido', 'etiqueta', 'anonimo', 'fechaCreacion', 'userId'],
        order: [
            ['fechaCreacion', 'DESC'] // Ordena los resultados por el campo `fecha` en orden descendente
        ]
    });
    res.json(foros);
    // const foros2 = await sequelize.query('SELECT forums.id, forums.titulo, forums.updatedAt, forums.anonimo, forums.contenido, forums.etiqueta, forums.replicas, users.nombreUsuario, users.imgPerfil from Forums INNER JOIN users ON forums.userId = users.id ORDER BY forums.updatedAt DESC',{type: QueryTypes.SELECT})
    // res.json(foros2);
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
const createReplica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { contenidoreplica, userId } = req.body;
    try {
        replicaforo_model_1.ReplicaForo.create({
            forumId: id,
            contenidoreplica: contenidoreplica,
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
        msg: `Replica agregada exitosamente!`,
    });
});
exports.createReplica = createReplica;
const countReplicasForo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { forumId } = req.params;
    const totReplicas = yield replicaforo_model_1.ReplicaForo.count({
        where: { forumId: forumId }
    });
    res.json(totReplicas);
});
exports.countReplicasForo = countReplicasForo;
const addReporte = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion, userId, forumId } = req.body;
    try {
        reporte_model_1.Reporte.create({
            descripcion: descripcion,
            userId: userId,
            forumId: forumId
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Reporte generado exitosamente!`,
    });
});
exports.addReporte = addReporte;
