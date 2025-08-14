import { Router } from 'express';
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categories.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Get all categories
router.get('/', authenticateToken, getCategories);

// Get a category by ID
router.get('/:id', authenticateToken, getCategoryById);

// Create a new category
router.post('/', authenticateToken, createCategory);

// Update a category by ID
router.put('/:id', authenticateToken, updateCategory);

// Delete a category by ID
router.delete('/:id', authenticateToken, deleteCategory);

export default router;