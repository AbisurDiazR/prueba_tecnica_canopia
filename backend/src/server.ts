import express from 'express';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import categoriesRoutes from './routes/categories.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/products',productsRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/categories',categoriesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});