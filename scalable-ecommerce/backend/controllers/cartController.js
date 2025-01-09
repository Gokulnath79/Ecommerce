const Cart = require('../models/Cart');

const cartController = {
  async getCart(req, res) {
    try {
      const cartItems = await Cart.getAll();
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart' });
    }
  },
  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      await Cart.addToCart(productId, quantity);
      res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart' });
    }
  },
};

module.exports = cartController;
