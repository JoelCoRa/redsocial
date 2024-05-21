"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsSeg_controller_1 = require("../controllers/postsSeg.controller");
const router = (0, express_1.Router)();
router.get('/', postsSeg_controller_1.getPostsSeg);
exports.default = router;
