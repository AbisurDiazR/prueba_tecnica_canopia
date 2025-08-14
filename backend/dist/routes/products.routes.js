"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Get all products
router.get('/', auth_middleware_1.authenticateToken, products_controller_1.getProducts);
// Get a product by ID
router.get('/:id', auth_middleware_1.authenticateToken, products_controller_1.getProductById);
// Create a new product
router.post('/', auth_middleware_1.authenticateToken, products_controller_1.createProduct);
// Update a product by ID
router.put('/:id', auth_middleware_1.authenticateToken, products_controller_1.updateProduct);
// Delete a product by ID
router.delete('/:id', auth_middleware_1.authenticateToken, products_controller_1.deleteProduct);
exports.default = router;
