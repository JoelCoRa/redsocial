"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postseguidos_controller_1 = require("../controllers/postseguidos.controller");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post('/', validateToken_1.default, postseguidos_controller_1.getPostsSeguidos);
exports.default = router;
