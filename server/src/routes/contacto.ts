import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { createContact } from "../controllers/contacto.controller";

const router = Router();
// Cambiar por los de contacto
router.post('/createcontact', createContact); 


export default router;