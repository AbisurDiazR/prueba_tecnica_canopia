import { Request, Response } from 'express';
import pool from '../services/db.service';
import { RowDataPacket } from 'mysql2';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category_id } = req.body;


        if (!name || !price) {
            return res.status(400).json({ message: 'Nombre y precio son campos obligatorios.' });
        }

        const [result] = await pool.execute(
            'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, stock, category_id]
        );

        res.status(201).json({ message: 'Producto creado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto.' });
    }
};


export const getProducts = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body;

        // Validación de campos obligatorios
        if (!name || !price) {
            return res.status(400).json({ message: 'Nombre y precio son campos obligatorios.' });
        }

        const [result] = await pool.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
            [name, description, price, stock, category_id, id]
        );

        res.json({ message: 'Producto actualizado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // La consulta SQL correcta debe especificar las columnas a seleccionar (por ejemplo, '*')
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);

        // Si no se encuentra el producto, `rows` será un arreglo vacío.
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
};