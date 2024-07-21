import express from 'express';
import productRoutes from './src/routes/productRoutes';
import cartRoutes from './src/routes/cartRoutes';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

export default app;