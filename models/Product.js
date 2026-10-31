const mongoose = require('mongoose');

// Maps 1:1 to the sample data given in the assignment:
// { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode }
const productSchema = new mongoose.Schema(
  {
    ProductCode: { type: String, required: true, trim: true },
    ProductName: { type: String, required: true, trim: true },
    ProductDate: { type: Date, required: true },
    ProductOriginPrice: { type: Number, required: true, min: 0 },
    Quantity: { type: Number, required: true, min: 0 },
    ProductStoreCode: { type: String, required: true, trim: true }
  },
  {
    // Force the exact collection name required by the assignment
    collection: 'ProductCollection',
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
