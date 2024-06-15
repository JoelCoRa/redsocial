"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("./validateToken"));
const perfil_controller_1 = require("../controllers/perfil.controller");
const perfil_controller_2 = require("../controllers/perfil.controller");
const router = (0, express_1.Router)();
router.post('/createpost', validateToken_1.default, perfil_controller_1.createPost);
router.post('/addseguidor', validateToken_1.default, perfil_controller_1.addSeguidor);
router.put('/adddescripcion/:id', validateToken_1.default, perfil_controller_1.updateDescripcion);
router.put('/addimgperfil/:id', validateToken_1.default, perfil_controller_1.addImgPerfil);
// router.put('/addlike/:id', addLike);
// router.put('/adddislike/:id', addDislike);
router.get('/postpropio/:id', validateToken_1.default, perfil_controller_1.getPosts);
router.get('/getuser/:id', validateToken_1.default, perfil_controller_2.getUser);
// router.get('/getorg/:id', getOrg);
router.get('/getuser/totalposts/:id', validateToken_1.default, perfil_controller_1.countPosts);
router.get('/getseguidos/:id', validateToken_1.default, perfil_controller_1.cuentasSeguidas);
router.get('/getseguidores/:id', validateToken_1.default, perfil_controller_1.cuentasSeguidores);
router.get('/getlikes/:id', validateToken_1.default, perfil_controller_1.getLikes);
// router.get('/getdislikes/:id', getDislikes);
router.get('/countseguidos/:id', validateToken_1.default, perfil_controller_1.countSeguidos);
router.get('/countseguidores/:id', validateToken_1.default, perfil_controller_1.countSeguidores);
// router.get('/getseguidos/:id', getSeguidos);
// router.get('/getseguidores/:id', getSeguidores);
router.delete('/deletepost/:id', validateToken_1.default, perfil_controller_1.deletePost);
router.delete('/deleteseguidor/:seguidoId/:seguidorId', validateToken_1.default, perfil_controller_1.deleteSeguidor);
exports.default = router;
