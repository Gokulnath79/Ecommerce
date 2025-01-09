const db = require('../config/db');

const Cart = {
  async getAll() {
    const [cartItems] = await db.query(
      `SELECT c.id, c.product_id, c.quantity, p.name, p.price 
       FROM cart c
       JOIN products p ON c.product_id = p.id`
    );
    return cartItems;
  },
  async addToCart(productId, quantity) {
    await db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [productId, quantity]);
  },
  async clearCart() {
    await db.query('DELETE FROM cart');
  },
};

module.exports = Cart;
