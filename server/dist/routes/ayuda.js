"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ayuda_controller_1 = require("../controllers/ayuda.controller");
const router = (0, express_1.Router)();
// Cambiar por los de ayuda
router.post('/createsolapoyo', ayuda_controller_1.createSolicitudApoyo);
exports.default = router;
