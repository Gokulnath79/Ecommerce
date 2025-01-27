const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
