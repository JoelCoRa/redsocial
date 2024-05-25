"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foros_controller_1 = require("../controllers/foros.controller");
const router = (0, express_1.Router)();
// Cambiar por los de foros
router.post('/crearforo', foros_controller_1.crearForo);
router.post('/crearreplica/:id', foros_controller_1.createReplica);
router.get('/getforo/:id', foros_controller_1.getForo);
router.get('/searchforos', foros_controller_1.searchForo);
router.get('/searchforosaux', foros_controller_1.searchForoAux);
router.get('/getallforos', foros_controller_1.getAllForos);
router.get('/getreplicasforo/:id', foros_controller_1.getReplicasForo);
exports.default = router;
