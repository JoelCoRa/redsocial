import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { crearForo, getAllForos, getForo, getReplicasForo, searchForo } from "../controllers/foros.controller";

const router = Router();
// Cambiar por los de foros
router.post('/crearforo', crearForo); 

router.get('/getforo/:id', getForo); 
router.get('/searchforos', searchForo); 
router.get('/getallforos', getAllForos); 
router.get('/getreplicasforo/:id', getReplicasForo); 


export default router;