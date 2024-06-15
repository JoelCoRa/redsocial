import { Router } from "express";
import validateToken from "./validateToken";
import { addImgPerfil, addSeguidor, countPosts, countSeguidores, countSeguidos, createPost, cuentasSeguidas, cuentasSeguidores, deletePost, deleteSeguidor, getLikes, getPosts, getSeguidores, getSeguidos, updateDescripcion} from "../controllers/perfil.controller";
import { getUser } from "../controllers/perfil.controller";

const router = Router();

router.post('/createpost', validateToken, createPost);
router.post('/addseguidor', validateToken, addSeguidor);

router.put('/adddescripcion/:id', validateToken, updateDescripcion);
router.put('/addimgperfil/:id',validateToken, addImgPerfil);

// router.put('/addlike/:id', addLike);
// router.put('/adddislike/:id', addDislike);

router.get('/postpropio/:id', validateToken, getPosts);
router.get('/getuser/:id',validateToken, getUser);
// router.get('/getorg/:id', getOrg);
router.get('/getuser/totalposts/:id',validateToken, countPosts);
router.get('/getseguidos/:id', validateToken, cuentasSeguidas);
router.get('/getseguidores/:id', validateToken, cuentasSeguidores);
router.get('/getlikes/:id', validateToken, getLikes);
// router.get('/getdislikes/:id', getDislikes);
router.get('/countseguidos/:id', validateToken, countSeguidos);
router.get('/countseguidores/:id', validateToken, countSeguidores);
// router.get('/getseguidos/:id', getSeguidos);
// router.get('/getseguidores/:id', getSeguidores);

router.delete('/deletepost/:id', validateToken, deletePost);
router.delete('/deleteseguidor/:seguidoId/:seguidorId', validateToken, deleteSeguidor);




export default router;