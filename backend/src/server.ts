import express from 'express';
import dotenv from 'dotenv';
//import authRoutes from './routes/auth.routes';
//import productRoutes from './routes/products.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
//app.use('/api', authRoutes);
//app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});