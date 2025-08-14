"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
// Get all products
router.get('/', products_controller_1.getProducts);
// Get a product by ID
router.get('/:id', products_controller_1.getProductById);
// Create a new product
router.post('/', products_controller_1.createProduct);
// Update a product by ID
router.put('/:id', products_controller_1.updateProduct);
// Delete a product by ID
router.delete('/:id', products_controller_1.deleteProduct);
exports.default = router;
