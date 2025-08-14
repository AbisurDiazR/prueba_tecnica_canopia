import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../services/db.service';
import { RowDataPacket } from 'mysql2';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.execute(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña.' });
        }

        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '5m' } // El token debe tener una duración de 5 minutos [cite: 20]
        );


        res.json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};