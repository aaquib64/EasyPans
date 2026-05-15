const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
  type: { type: String, enum: ["IN", "OUT", "ADJUST"], required: true },
  quantity: Number,
  reason: String,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("StockMovement", stockMovementSchema);
