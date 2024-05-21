"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foros_controller_1 = require("../controllers/foros.controller");
const router = (0, express_1.Router)();
// Cambiar por los de foros
router.get('/crearforo', foros_controller_1.crearForo);
exports.default = router;
