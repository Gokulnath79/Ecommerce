const db = require('../config/db');

const cartController = {
  async getCart(req, res) {
    try {
      const [cartItems] = await db.query(
        `SELECT c.id, c.product_id, c.quantity, p.name, p.price 
         FROM cart c
         JOIN products p ON c.product_id = p.id`
      );
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart' });
    }
  },

  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      await db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [productId, quantity]);
      res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart' });
    }
  },

  async clearCart(req, res) {
    try {
      await db.query('DELETE FROM cart');
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error clearing cart' });
    }
  },
};

module.exports = cartController;
