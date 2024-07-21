import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRoutes';
import cartRouter from './routes/cartRoutes';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
