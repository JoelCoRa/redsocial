"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ajustes_controller_1 = require("../controllers/ajustes.controller");
const router = (0, express_1.Router)();
// Cambiar por los de ajustes
router.get('/getuserajustes/:id', ajustes_controller_1.getUserAjustes);
router.put('/updateuser/:id', ajustes_controller_1.updateUser);
router.put('/updatepassword/:id', ajustes_controller_1.updatePassword);
exports.default = router;
