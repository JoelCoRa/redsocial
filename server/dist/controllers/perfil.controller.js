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
exports.updateDescripcion = exports.getLikes = exports.addImgPerfil = exports.getSeguidores = exports.getSeguidos = exports.addSeguidor = exports.deleteSeguidor = exports.deletePost = exports.createPost = exports.cuentasSeguidores = exports.cuentasSeguidas = exports.countSeguidores = exports.countSeguidos = exports.countPosts = exports.getUser = exports.getPosts = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const post_model_1 = require("../models/post.model");
const user_model_1 = require("../models/user.model");
const seguidosseguidores_model_1 = require("../models/seguidosseguidores.model");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const listPosts = yield post_model_1.Post.findAll({
        where: {
            userId: id
        },
        attributes: [
            'id', 'contenido', 'fechaPublicacion', 'likes', 'dislikes'
        ],
        order: [['fechaPublicacion', 'DESC']]
    });
    res.json(listPosts);
});
exports.getPosts = getPosts;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const user = yield user_model_1.User.findOne({
        where: {
            id: id
        },
        attributes: [
            'id', 'nombreUsuario', 'descripcion', 'cuentasSeguidas', 'seguidores', 'imgPerfil', 'tipoUsuario', 'correo'
        ]
    });
    res.json(user);
});
exports.getUser = getUser;
const countPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const totalPosts = yield post_model_1.Post.count({
        where: {
            userId: id
        }
    });
    console.log(totalPosts);
    res.json(totalPosts);
});
exports.countPosts = countPosts;
const countSeguidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const totSeguidos = yield seguidosseguidores_model_1.SeguidoSeguidor.count({
        where: {
            userIdSeguidor: id
        }
    });
    console.log(totSeguidos);
    res.json(totSeguidos);
});
exports.countSeguidos = countSeguidos;
const countSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const totSeguidores = yield seguidosseguidores_model_1.SeguidoSeguidor.count({
        where: {
            userIdSeguido: id
        }
    });
    console.log(totSeguidores);
    res.json(totSeguidores);
});
exports.countSeguidores = countSeguidores;
const cuentasSeguidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const seguidos = await SeguidoSeguidor.findAll({
    //     where:{ 
    //         userIdSeguidor: id
    //     }
    // })
    const seguidos = yield connection_1.default.query('Select seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor, users.imgPerfil from seguidosseguidores JOIN users ON seguidosseguidores.userIdSeguido = users.id where userIdSeguidor = ?', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    res.json(seguidos);
});
exports.cuentasSeguidas = cuentasSeguidas;
const cuentasSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const seguidores = await SeguidoSeguidor.findAll({
    //     where:{ 
    //         userIdSeguido: id
    //     }
    // })
    const seguidores = yield connection_1.default.query('Select seguidosseguidores.userIdSeguido, seguidosseguidores.userIdSeguidor, seguidosseguidores.nombreUserSeguido, seguidosseguidores.nombreUserSeguidor, users.imgPerfil from seguidosseguidores JOIN users ON seguidosseguidores.userIdSeguidor = users.id where userIdSeguido = ?', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    // const seguidos = await sequelize.query('Select userIdSeguido, userIdSeguidor, nombreUserSeguido, nombreUserSeguidor from seguidosseguidores where userIdSeguido = ?', {type: QueryTypes.SELECT, replacements: [id]});
    res.json(seguidores);
});
exports.cuentasSeguidores = cuentasSeguidores;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contenido, userId } = req.body;
    // console.log(req.body);
    try {
        post_model_1.Post.create({
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
        msg: `Publicación creada exitosamente!`,
    });
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.params);
    try {
        post_model_1.Post.destroy({
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
        msg: `Publicación eliminada exitosamente!`,
    });
});
exports.deletePost = deletePost;
const deleteSeguidor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seguidoId, seguidorId } = req.params;
    try {
        yield seguidosseguidores_model_1.SeguidoSeguidor.destroy({
            where: {
                userIdSeguido: seguidoId,
                userIdSeguidor: seguidorId,
            }
        });
        // await sequelize.query(`Delete from seguidosseguidores where userIdSeguido = ${seguidoId} AND userIdSeguidor = ${seguidorId}`)
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Has dejado seguir al usuario!`,
    });
});
exports.deleteSeguidor = deleteSeguidor;
const addSeguidor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIdSeguido, userIdSeguidor, nombreUserSeguido, nombreUserSeguidor } = req.body;
    const seg = userIdSeguido;
    console.log(seg);
    try {
        seguidosseguidores_model_1.SeguidoSeguidor.create({
            userIdSeguido: userIdSeguido,
            userIdSeguidor: userIdSeguidor,
            nombreUserSeguido: nombreUserSeguido,
            nombreUserSeguidor: nombreUserSeguidor,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Has seguido a este usuario!`,
    });
});
exports.addSeguidor = addSeguidor;
const getSeguidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const user = yield seguidosseguidores_model_1.SeguidoSeguidor.findAll({
        where: {
            userIdSeguidor: id
        },
    });
    res.json(user);
});
exports.getSeguidos = getSeguidos;
const getSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const user = yield seguidosseguidores_model_1.SeguidoSeguidor.findAll({
        where: {
            userIdSeguido: id
        },
    });
    res.json(user);
});
exports.getSeguidores = getSeguidores;
const addImgPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { imgPerfil } = req.body;
    try {
        yield user_model_1.User.update({ imgPerfil: imgPerfil }, { where: { id: id } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Foto actualizada exitosamente!`,
    });
});
exports.addImgPerfil = addImgPerfil;
// export const addLike = async(req: Request, res: Response) =>{
//     const { id } = req.params;
//     const { likes } = req.body;
//     console.log(id)
//     console.log(req.body)
//     const likesActuales = likes;
//     console.log(likesActuales)
//     try{        
//         Post.update(
//             { likes:  likesActuales},{
//             where: {
//                 id: id
//             }
//         });
//     }catch(error){
//         res.status(400).json({
//             msg: "Oops ocurrio un error!",
//             error
//         });
//     } 
//     res.json({
//         msg: `Publicación likeada exitosamente!`,
//     });
// }
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const seguidos = yield connection_1.default.query('Select postid, userid from Likes where postid = ?', { type: sequelize_1.QueryTypes.SELECT, replacements: [id] });
    res.json(seguidos);
});
exports.getLikes = getLikes;
const updateDescripcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        user_model_1.User.update({ descripcion: descripcion }, { where: { id: id } });
    }
    catch (error) {
        res.status(400).json({
            msg: "Oops ocurrio un error!",
            error
        });
    }
    res.json({
        msg: `Descripción actualizada exitosamente!`,
    });
});
exports.updateDescripcion = updateDescripcion;
