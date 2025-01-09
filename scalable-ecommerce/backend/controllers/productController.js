const Product = require('../models/Product');

const productController = {
  async getProducts(req, res) {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },
  async addProduct(req, res) {
    try {
      const { name, price } = req.body;
      const productId = await Product.create({ name, price });
      res.status(201).json({ id: productId, name, price });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add product' });
    }
  },
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.delete(id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  },
};

module.exports = productController;
