import InventoryItem from "../models/InventoryItem.model.js";
import StockMovement from "../models/StockMovement.model.js";

export const createItem = async (req, res) => {
  const item = await InventoryItem.create(req.body);
  res.status(201).json(item);
};

export const getItems = async (req, res) => {
  const items = await InventoryItem.find({ isActive: true });
  res.json(items);
};

export const updateItem = async (req, res) => {
  const item = await InventoryItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

export const deleteItem = async (req, res) => {
  await InventoryItem.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "Item removed" });
};

export const stockIn = async (req, res) => {
  const { quantity, reason } = req.body;

  const item = await InventoryItem.findById(req.params.id);
  item.stock += quantity;
  await item.save();

  await StockMovement.create({
    itemId: item._id,
    type: "IN",
    quantity,
    reason,
    performedBy: req.user.id
  });

  res.json(item);
};

export const stockOut = async (req, res) => {
  const { quantity, reason } = req.body;

  const item = await InventoryItem.findById(req.params.id);
  if (item.stock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  item.stock -= quantity;
  await item.save();

  await StockMovement.create({
    itemId: item._id,
    type: "OUT",
    quantity,
    reason,
    performedBy: req.user.id
  });

  res.json(item);
};

