"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_controller_1 = require("../controllers/contacto.controller");
const router = (0, express_1.Router)();
// Cambiar por los de contacto
router.post('/createcontact', contacto_controller_1.createContact);
router.post('/createcontactportal', contacto_controller_1.createContactPortal);
exports.default = router;
