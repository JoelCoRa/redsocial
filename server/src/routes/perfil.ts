import { Router } from "express";
import validateToken from "./validateToken";
import { addImgPerfil, addSeguidor, countPosts, countSeguidores, countSeguidos, createPost, cuentasSeguidas, cuentasSeguidores, deletePost, deleteSeguidor, getLikes, getPosts, getSeguidores, getSeguidos, updateDescripcion} from "../controllers/perfil.controller";
import { getUser } from "../controllers/perfil.controller";

const router = Router();

router.post('/createpost', createPost);
router.post('/addseguidor', addSeguidor);

router.put('/adddescripcion/:id', updateDescripcion);
router.put('/addimgperfil/:id', addImgPerfil);


// router.put('/addlike/:id', addLike);
// router.put('/adddislike/:id', addDislike);

router.get('/postpropio/:id', getPosts);
router.get('/getuser/:id', getUser);
router.get('/getuser/totalposts/:id', countPosts);
router.get('/getseguidos/:id', cuentasSeguidas);
router.get('/getseguidores/:id', cuentasSeguidores);
router.get('/getlikes/:id', getLikes);
// router.get('/getdislikes/:id', getDislikes);
router.get('/countseguidos/:id', countSeguidos);
router.get('/countseguidores/:id', countSeguidores);
// router.get('/getseguidos/:id', getSeguidos);
// router.get('/getseguidores/:id', getSeguidores);

router.delete('/deletepost/:id', deletePost);
router.delete('/deleteseguidor/:seguidoId/:seguidorId', deleteSeguidor);




export default router;