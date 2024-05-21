"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("./validateToken"));
const posts_controller_1 = require("../controllers/posts.controller");
const router = (0, express_1.Router)();
router.get('/postseg', validateToken_1.default, posts_controller_1.getPostsSeg);
router.get('/postpropio', validateToken_1.default, posts_controller_1.getPostsPropios);
exports.default = router;
