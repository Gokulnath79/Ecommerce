const db = require('../config/db');

const productController = {
  async getProducts(req, res) {
    try {
      const [products] = await db.query('SELECT * FROM products');
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  async addProduct(req, res) {
    try {
      const { name, price } = req.body;
      const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
      res.status(201).json({ id: result.insertId, name, price });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM products WHERE id = ?', [id]);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  },
};

module.exports = productController;
