import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { deleteUser, getAllUsers, updateAdmin, updateBlocked } from "../controllers/administrador.controller";

const router = Router();
// Cambiar por los de admin
router.get('/getallusers/:id', getAllUsers); 

router.delete('/deleteuser/:id', deleteUser)


router.put('/updateadmin/:id', updateAdmin)
router.put('/unblockuser/:id', updateBlocked)


export default router;