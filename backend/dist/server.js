"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//import authRoutes from './routes/auth.routes';
//import productRoutes from './routes/products.routes';
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Rutas
//app.use('/api', authRoutes);
//app.use('/api', productRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
