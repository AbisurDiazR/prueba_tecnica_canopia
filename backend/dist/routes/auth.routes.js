"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Ruta para el registro de usuarios
router.post('/register');
// Ruta para el inicio de sesión
router.post('/login');
exports.default = router;
