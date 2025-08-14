import { Request, Response } from 'express';
import { ProductService } from '../services/products.service';

export class ProductsController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    // Get all products
    async getAllProducts(req: Request, res: Response): Promise<Response> {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    // Get a single product by ID
    async getProductById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching product', error });
        }
    }

    // Create a new product
    async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const productData = req.body;
            const newProduct = await this.productService.createProduct(productData);
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating product', error });
        }
    }

    // Update an existing product
    async updateProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await this.productService.updateProduct(id, productData);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating product', error });
        }
    }

    // Delete a product
    async deleteProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deleted = await this.productService.deleteProduct(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}