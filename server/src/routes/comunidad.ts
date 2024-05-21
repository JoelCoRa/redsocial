import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { searchComunidad } from "../controllers/comunidad.controller";

const router = Router();
// Cambiar por los de comunidad
router.get('/searchcomunidad', searchComunidad); 


export default router;