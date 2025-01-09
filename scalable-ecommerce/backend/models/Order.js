const db = require('../config/db');

const Order = {
  async createOrder(orderDetails) {
    const { products, totalAmount, address, name } = orderDetails;

    // Insert the order
    const result = await db.query('INSERT INTO orders (name, address, total_amount) VALUES (?, ?, ?)', [
      name,
      address,
      totalAmount,
    ]);

    const orderId = result[0].insertId;

    // Insert order products
    for (const product of products) {
      await db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [
        orderId,
        product.productId,
        product.quantity,
      ]);
    }

    return orderId;
  },
};

module.exports = Order;
