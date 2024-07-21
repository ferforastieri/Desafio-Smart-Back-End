import pool from '../database';
import { getProductById } from './productService';
import Cart from '../models/cart';

export const getCartById = async (cartId: number): Promise<Cart | undefined> => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT * FROM cart_items WHERE cart_id = $1
    `, [cartId]);

    const items = result.rows.map((row: any) => ({
      productId: row.product_id,
      quantity: row.quantity,
    }));

    return { id: cartId, items };
  } finally {
    client.release();
  }
};

export const addProductToCart = async (cartId: number, productId: number, quantity: number): Promise<Cart | undefined> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const product = await getProductById(productId);

    if (!product || product.stock < quantity) {
      await client.query('ROLLBACK');
      return undefined;
    }

    const cartItemResult = await client.query(`
      SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2
    `, [cartId, productId]);

    if (cartItemResult.rows.length > 0) {
      await client.query(`
        UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3
      `, [quantity, cartId, productId]);
    } else {
      await client.query(`
        INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)
      `, [cartId, productId, quantity]);
    }

    await client.query(`
      UPDATE products SET stock = stock - $1 WHERE id = $2
    `, [quantity, productId]);

    await client.query('COMMIT');

    return getCartById(cartId);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const removeProductFromCart = async (cartId: number, productId: number): Promise<Cart | undefined> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const cartItemResult = await client.query(`
      SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2
    `, [cartId, productId]);

    if (cartItemResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return undefined;
    }

    const quantity = cartItemResult.rows[0].quantity;

    await client.query(`
      DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2
    `, [cartId, productId]);

    await client.query(`
      UPDATE products SET stock = stock + $1 WHERE id = $2
    `, [quantity, productId]);

    await client.query('COMMIT');

    return getCartById(cartId);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getCartTotalPoints = async (cartId: number): Promise<number> => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT SUM(p.price_in_points * ci.quantity) AS total_points
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = $1
    `, [cartId]);

    return result.rows[0].total_points || 0;
  } finally {
    client.release();
  }
};
