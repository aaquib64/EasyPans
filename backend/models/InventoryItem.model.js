const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true },
  category: String,
  unit: { type: String, default: "pcs" },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 },
  price: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
