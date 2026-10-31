const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * Requirement 2: display all products with all information.
 * Requirement 3: sort products by ProductStoreCode, descending order
 *                (products sharing the same ProductStoreCode are grouped together).
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductStoreCode: -1, ProductCode: 1 });
    res.render('products/index', { products, error: null });
  } catch (err) {
    res.render('products/index', { products: [], error: err.message });
  }
});

/**
 * Requirement 2: allow insert a new product from the website.
 */
router.post('/', async (req, res) => {
  try {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;

    await Product.create({
      ProductCode,
      ProductName,
      ProductDate,
      ProductOriginPrice,
      Quantity,
      ProductStoreCode
    });

    res.redirect('/');
  } catch (err) {
    const products = await Product.find().sort({ ProductStoreCode: -1, ProductCode: 1 });
    res.render('products/index', { products, error: err.message });
  }
});

/**
 * Requirement 2: allow delete a product from the website.
 * Uses method-override so a normal HTML <form> can send an HTTP DELETE.
 */
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    const products = await Product.find().sort({ ProductStoreCode: -1, ProductCode: 1 });
    res.render('products/index', { products, error: err.message });
  }
});

module.exports = router;
