"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administrador_controller_1 = require("../controllers/administrador.controller");
const router = (0, express_1.Router)();
// Cambiar por los de admin
router.get('/getallusers/:id', administrador_controller_1.getAllUsers);
router.delete('/deleteuser/:id', administrador_controller_1.deleteUser);
router.put('/updateadmin/:id', administrador_controller_1.updateAdmin);
router.put('/unblockuser/:id', administrador_controller_1.updateBlocked);
exports.default = router;
