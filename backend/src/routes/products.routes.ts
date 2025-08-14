import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Get all products
router.get('/', authenticateToken, getProducts);

// Get a product by ID
router.get('/:id', authenticateToken, getProductById);

// Create a new product
router.post('/', authenticateToken, createProduct);

// Update a product by ID
router.put('/:id', authenticateToken, updateProduct);

// Delete a product by ID
router.delete('/:id', authenticateToken, deleteProduct);

export default router;