const db = require('../config/db');

const orderController = {
  async createOrder(req, res) {
    try {
      const { name, address } = req.body;
      const [cartItems] = await db.query(
        `SELECT c.product_id, c.quantity, p.price 
         FROM cart c
         JOIN products p ON c.product_id = p.id`
      );

      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      const [orderResult] = await db.query('INSERT INTO orders (user_name, address) VALUES (?, ?)', [
        name,
        address,
      ]);

      const orderId = orderResult.insertId;

      for (const item of cartItems) {
        await db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [
          orderId,
          item.product_id,
          item.quantity,
        ]);
      }

      await db.query('DELETE FROM cart');
      res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' });
    }
  },
};

module.exports = orderController;
