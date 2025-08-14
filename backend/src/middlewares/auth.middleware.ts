import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare module 'express' {
    export interface Request {
        user?: { id: number; username: string; role: string };
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }


    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado.' });
        }


        req.user = user as { id: number; username: string; role: string };
        next();
    });
};