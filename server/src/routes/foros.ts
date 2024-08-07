import { Router } from "express";
// import validateToken from "./validateToken";
import { addReporte, countReplicasForo, crearForo, createReplica, deleteForo, deleteReplica, getAllForos, getForo, getReplicasForo, searchForo, searchForoAux } from "../controllers/foros.controller";

const router = Router();
router.post('/crearforo', crearForo); 
router.post('/crearreplica/:id', createReplica); 
router.post('/crearreporte', addReporte); 

router.get('/getforo/:id', getForo); 
router.get('/searchforos', searchForo); 
router.get('/searchforosaux', searchForoAux); 
router.get('/countreplicas/:forumId', countReplicasForo); 
router.get('/getallforos', getAllForos); 
router.get('/getreplicasforo/:id', getReplicasForo); 

router.delete('/deleteforo/:id', deleteForo); 
router.delete('/deletereplica/:id', deleteReplica); 


export default router;