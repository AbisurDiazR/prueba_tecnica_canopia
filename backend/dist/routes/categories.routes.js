"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Get all categories
router.get('/', auth_middleware_1.authenticateToken, categories_controller_1.getCategories);
// Get a category by ID
router.get('/:id', auth_middleware_1.authenticateToken, categories_controller_1.getCategoryById);
// Create a new category
router.post('/', auth_middleware_1.authenticateToken, categories_controller_1.createCategory);
// Update a category by ID
router.put('/:id', auth_middleware_1.authenticateToken, categories_controller_1.updateCategory);
// Delete a category by ID
router.delete('/:id', auth_middleware_1.authenticateToken, categories_controller_1.deleteCategory);
exports.default = router;
