"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const db_service_1 = __importDefault(require("../services/db.service"));
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: 'Nombre y precio son campos obligatorios.' });
        }
        const [result] = await db_service_1.default.execute('INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)', [name, description, price, stock, category_id]);
        res.status(201).json({ message: 'Producto creado exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto.' });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const [rows] = await db_service_1.default.execute('SELECT * FROM products');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
};
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body;
        // Validación de campos obligatorios
        if (!name || !price) {
            return res.status(400).json({ message: 'Nombre y precio son campos obligatorios.' });
        }
        const [result] = await db_service_1.default.execute('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?', [name, description, price, stock, category_id, id]);
        res.json({ message: 'Producto actualizado exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db_service_1.default.execute('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};
exports.deleteProduct = deleteProduct;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        // La consulta SQL correcta debe especificar las columnas a seleccionar (por ejemplo, '*')
        const [rows] = await db_service_1.default.execute('SELECT * FROM products WHERE id = ?', [id]);
        // Si no se encuentra el producto, `rows` será un arreglo vacío.
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
};
exports.getProductById = getProductById;
