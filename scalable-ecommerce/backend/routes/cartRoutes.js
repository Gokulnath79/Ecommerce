const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
