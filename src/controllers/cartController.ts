import { Request, Response } from 'express';
import { getCartById, addProductToCart, removeProductFromCart, getCartTotalPoints } from '../services/cartService';

export const viewCart = (req: Request, res: Response): void => {
  const { cartId } = req.params;
  const cart = getCartById(Number(cartId));
  if (!cart) {
    res.status(404).send('Cart not found');
  } else {
    const totalPoints = getCartTotalPoints(Number(cartId));
    res.json({ cart, totalPoints });
  }
};

export const addToCart = (req: Request, res: Response): void => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;
  const cart = addProductToCart(Number(cartId), Number(productId), Number(quantity));
  if (!cart) {
    res.status(400).send('Unable to add product to cart');
  } else {
    res.json(cart);
  }
};

export const removeFromCart = (req: Request, res: Response): void => {
  const { cartId } = req.params;
  const { productId } = req.body;
  const cart = removeProductFromCart(Number(cartId), Number(productId));
  if (!cart) {
    res.status(400).send('Unable to remove product from cart');
  } else {
    res.json(cart);
  }
};