import { Request, Response } from 'express';
import { getAllProducts } from '../services/productService';

export const listProducts = (req: Request, res: Response): void => {
  const { order, search, page = 1, limit = 10 } = req.query;
  const products = getAllProducts(order as string, search as string, Number(page), Number(limit));
  res.json(products);
};