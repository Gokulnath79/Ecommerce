require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');

app.use(express.json());

// Verify DB connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to the MySQL database successfully.');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

// Sample route for testing
app.get('/test', (req, res) => {
  res.send('API is working!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
