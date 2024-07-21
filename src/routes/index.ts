import { Router } from "express";
import { getAllProducts } from "../controllers/productController";
import { getCart, addToCart, removeFromCart, finalizeCart } from "../controllers/cartController";

const router = Router();

router.get("/products", getAllProducts);
router.get("/cart/:cartId", getCart);
router.post("/cart/:cartId/product/:productId", addToCart);
router.delete("/cart/:cartId/product/:productId", removeFromCart);
router.post("/cart/:cartId/finalize", finalizeCart);

export default router;
