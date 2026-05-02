const express = require('express');
const router = express.Router();
const {
  getProducts,
  getCategories,
  getProductById,
  getRelatedProducts
} = require('../controllers/productController');

router.get('/categories', getCategories);
router.get('/:id/related', getRelatedProducts);
router.get('/:id', getProductById);
router.get('/', getProducts);

module.exports = router;
