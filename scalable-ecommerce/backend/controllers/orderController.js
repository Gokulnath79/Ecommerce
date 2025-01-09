const Order = require('../models/Order');
const Cart = require('../models/Cart');

const orderController = {
  async createOrder(req, res) {
    try {
      const { name, address } = req.body;

      // Fetch cart items
      const cartItems = await Cart.getAll();

      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const orderDetails = {
        products: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
        })),
        totalAmount,
        address,
        name,
      };

      // Create order and clear cart
      const orderId = await Order.createOrder(orderDetails);
      await Cart.clearCart();

      res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' });
    }
  },
};

module.exports = orderController;
