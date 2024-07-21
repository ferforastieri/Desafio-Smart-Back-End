interface CartItem {
    productId: number;
    quantity: number;
  }
  
  interface Cart {
    id: number;
    items: CartItem[];
  }
  
  export default Cart;