import pool from '../database';
import Product from '../models/product';

export const getAllProducts = async (order: string = 'asc', search: string = '', page: number = 1, limit: number = 10): Promise<Product[]> => {
  const offset = (page - 1) * limit;
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM products
      WHERE name ILIKE $1
      ORDER BY price ${order === 'asc' ? 'ASC' : 'DESC'}
      LIMIT $2 OFFSET $3
    `, [`%${search}%`, limit, offset]);
    return result.rows;
  } finally {
    client.release();
  }
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
