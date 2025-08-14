"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_service_1 = __importDefault(require("../services/db.service"));
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const [result] = await db_service_1.default.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña.' });
        }
        const [rows] = await db_service_1.default.execute('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5m' } // El token debe tener una duración de 5 minutos [cite: 20]
        );
        res.json({ token });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};
exports.login = login;
