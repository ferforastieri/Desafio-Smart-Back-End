import express from 'express';
import { getAllProducts, getProductById } from '../services/productService';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req);
    
  const { order = 'asc', search = '', page = 1, limit = 10 } = req.query;
  try {
    const products = await getAllProducts(order as string, search as string, Number(page), Number(limit));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(Number(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
