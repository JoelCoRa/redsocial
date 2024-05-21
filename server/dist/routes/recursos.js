"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
// Cambiar por los de recursos
router.get('/postseg', dashboard_controller_1.getPostsSeg);
exports.default = router;
