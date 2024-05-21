"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
// Función para verificar y decodificar el token JWT
function verificarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Manejar la ausencia del token (redirigir al login, mostrar un mensaje, etc.)
        return null;
    }
    // Opcionalmente, puedes verificar la validez o vigencia del token antes de retornarlo
    return token;
}
exports.default = verificarToken;
