import { Router } from "express";
// import validateToken from "./validateToken";
import { deleteUser, getAllContactos, getAllReportes, getAllSolicitudes, getAllUsers, getContacto, getSolicitud, updateAdmin, updateBlocked } from "../controllers/administrador.controller";

const router = Router();
router.get('/getallusers/:id', getAllUsers); 
router.get('/getallreportes', getAllReportes); 
router.get('/getallsolicitudes', getAllSolicitudes); 
router.get('/getallcontactos', getAllContactos); 
router.get('/getcontacto/:id', getContacto); 
router.get('/getsolicitud/:id', getSolicitud); 

router.delete('/deleteuser/:id', deleteUser)

router.put('/updateadmin/:id', updateAdmin)
router.put('/unblockuser/:id', updateBlocked)
export default router;