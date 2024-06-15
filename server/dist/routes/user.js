"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post('/', user_controller_1.newUser);
router.post('/login', validateToken_1.default, user_controller_1.loginUser);
// router.post('/regorg', newOrganizacion);
// router.post('/loginorg', loginOrganizacion);
router.post('/resetpassword', user_controller_1.resetPassword);
// router.post('/req-reset-password', reqRecoverPassword);
// router.post('/reset-password', recoverPassword);
// router.get('/getuser', getUser);
exports.default = router;
