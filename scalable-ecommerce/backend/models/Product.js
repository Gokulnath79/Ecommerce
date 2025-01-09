const db = require('../config/db');

const Product = {
  async getAll() {
    const [products] = await db.query('SELECT * FROM products');
    return products;
  },
  async create(product) {
    const { name, price } = product;
    const result = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return result[0].insertId;
  },
  async delete(id) {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  },
  async findById(id) {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return product[0];
  },
};

module.exports = Product;
