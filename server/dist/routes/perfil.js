"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfil_controller_1 = require("../controllers/perfil.controller");
const perfil_controller_2 = require("../controllers/perfil.controller");
const router = (0, express_1.Router)();
router.post('/createpost', perfil_controller_1.createPost);
router.post('/addseguidor', perfil_controller_1.addSeguidor);
router.put('/adddescripcion/:id', perfil_controller_1.updateDescripcion);
router.put('/addimgperfil/:id', perfil_controller_1.addImgPerfil);
// router.put('/addlike/:id', addLike);
// router.put('/adddislike/:id', addDislike);
router.get('/postpropio/:id', perfil_controller_1.getPosts);
router.get('/getuser/:id', perfil_controller_2.getUser);
router.get('/getorg/:id', perfil_controller_1.getOrg);
router.get('/getuser/totalposts/:id', perfil_controller_1.countPosts);
router.get('/getseguidos/:id', perfil_controller_1.cuentasSeguidas);
router.get('/getseguidores/:id', perfil_controller_1.cuentasSeguidores);
router.get('/getlikes/:id', perfil_controller_1.getLikes);
// router.get('/getdislikes/:id', getDislikes);
router.get('/countseguidos/:id', perfil_controller_1.countSeguidos);
router.get('/countseguidores/:id', perfil_controller_1.countSeguidores);
// router.get('/getseguidos/:id', getSeguidos);
// router.get('/getseguidores/:id', getSeguidores);
router.delete('/deletepost/:id', perfil_controller_1.deletePost);
router.delete('/deleteseguidor/:seguidoId/:seguidorId', perfil_controller_1.deleteSeguidor);
exports.default = router;
