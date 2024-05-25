import { Router } from "express";
import validateToken from "./validateToken";
import { getPostsSeg } from "../controllers/dashboard.controller";
import { crearForo, createReplica, getAllForos, getForo, getReplicasForo, searchForo, searchForoAux } from "../controllers/foros.controller";

const router = Router();
// Cambiar por los de foros
router.post('/crearforo', crearForo); 
router.post('/crearreplica/:id', createReplica); 

router.get('/getforo/:id', getForo); 
router.get('/searchforos', searchForo); 
router.get('/searchforosaux', searchForoAux); 

router.get('/getallforos', getAllForos); 
router.get('/getreplicasforo/:id', getReplicasForo); 


export default router;