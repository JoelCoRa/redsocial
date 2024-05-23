import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { getUserAjustes, updatePassword, updateUser } from "../controllers/ajustes.controller";

const router = Router();
// Cambiar por los de ajustes
router.get('/getuserajustes/:id', getUserAjustes); 



router.put('/updateuser/:id', updateUser); 
router.put('/updatepassword/:id', updatePassword); 


export default router;