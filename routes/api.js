const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * Requirement 1 (REST API): insert a new product into ProductCollection.
 * POST /api/products
 * Body (JSON): { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode }
 */
router.post('/products', async (req, res) => {
  try {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;

    const product = new Product({
      ProductCode,
      ProductName,
      ProductDate,
      ProductOriginPrice,
      Quantity,
      ProductStoreCode
    });

    const saved = await product.save();
    res.status(201).json({ message: 'Product created', data: saved });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
  }
});

/**
 * Bonus (not required but useful for testing/display): get all products.
 * GET /api/products
 */
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductStoreCode: -1 });
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
});

/**
 * Requirement 1 (REST API): delete a product from ProductCollection.
 * DELETE /api/products/:id
 */
router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted', data: deleted });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete product', error: err.message });
  }
});

module.exports = router;
