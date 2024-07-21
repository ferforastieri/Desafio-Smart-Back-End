import express from 'express';
import { getCartById, addProductToCart, removeProductFromCart, getCartTotalPoints } from '../services/cartService';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const cart = await getCartById(Number(req.params.id));
    if (cart) {
      const totalPoints = await getCartTotalPoints(Number(req.params.id));
      res.json({ ...cart, totalPoints });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

router.post('/:cartId/products/:productId', async (req, res) => {
    
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;    
    const updatedCart = await addProductToCart(Number(cartId), Number(productId), Number(quantity));
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(400).json({ error: 'Failed to add product to cart' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

router.delete('/:cartId/products/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const updatedCart = await removeProductFromCart(Number(cartId), Number(productId));
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(400).json({ error: 'Failed to remove product from cart' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
});

export default router;
