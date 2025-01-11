require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test MySQL Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL database successfully.');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
  }
})();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error Handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
