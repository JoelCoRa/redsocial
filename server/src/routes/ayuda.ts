import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { createSolicitudApoyo } from "../controllers/ayuda.controller";

const router = Router();
// Cambiar por los de ayuda
router.post('/createsolapoyo', createSolicitudApoyo); 


export default router;