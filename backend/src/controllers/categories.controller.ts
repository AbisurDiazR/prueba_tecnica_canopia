import { Request, Response } from 'express';
import pool from '../services/db.service';
import { RowDataPacket } from 'mysql2';

// Crear una categoría
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }

        const [result] = await pool.execute(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [name, description]
        );

        res.status(201).json({ message: 'Categoría creada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la categoría.' });
    }
};

// Leer todas las categorías
export const getCategories = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
};

// Leer una categoría por ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM categories WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la categoría.' });
    }
};

// Actualizar una categoría
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }

        await pool.execute(
            'UPDATE categories SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        res.json({ message: 'Categoría actualizada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la categoría.' });
    }
};

// Eliminar una categoría
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
        res.json({ message: 'Categoría eliminada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la categoría.' });
    }
};