import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { crearForo } from "../controllers/foros.controller";

const router = Router();
// Cambiar por los de foros
router.get('/crearforo', crearForo); 


export default router;