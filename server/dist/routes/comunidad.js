"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comunidad_controller_1 = require("../controllers/comunidad.controller");
const router = (0, express_1.Router)();
// Cambiar por los de comunidad
router.get('/searchcomunidad', comunidad_controller_1.searchComunidad);
exports.default = router;
