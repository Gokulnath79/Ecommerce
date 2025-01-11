const db = require('../config/db');

const Product = {
  async getAll() {
    const [products] = await db.query('SELECT * FROM products');
    return products;
  },
  async create({ name, price }) {
    const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return result.insertId;
  },
};

module.exports = Product;
