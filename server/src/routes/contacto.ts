import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { createContact, createContactPortal } from "../controllers/contacto.controller";

const router = Router();
// Cambiar por los de contacto
router.post('/createcontact', createContact); 
router.post('/createcontactportal', createContactPortal); 


export default router;