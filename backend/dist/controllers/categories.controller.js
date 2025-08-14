"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const db_service_1 = __importDefault(require("../services/db.service"));
// Crear una categoría
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }
        const [result] = await db_service_1.default.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.status(201).json({ message: 'Categoría creada exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la categoría.' });
    }
};
exports.createCategory = createCategory;
// Leer todas las categorías
const getCategories = async (req, res) => {
    try {
        const [rows] = await db_service_1.default.execute('SELECT * FROM categories');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
};
exports.getCategories = getCategories;
// Leer una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db_service_1.default.execute('SELECT * FROM categories WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la categoría.' });
    }
};
exports.getCategoryById = getCategoryById;
// Actualizar una categoría
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es obligatorio.' });
        }
        await db_service_1.default.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        res.json({ message: 'Categoría actualizada exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la categoría.' });
    }
};
exports.updateCategory = updateCategory;
// Eliminar una categoría
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await db_service_1.default.execute('DELETE FROM categories WHERE id = ?', [id]);
        res.json({ message: 'Categoría eliminada exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la categoría.' });
    }
};
exports.deleteCategory = deleteCategory;
