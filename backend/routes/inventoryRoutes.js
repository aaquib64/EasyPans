const express = require("express");
// const { auth } = require("../middleware/authMiddleware");
// const { isAdmin } = require("../middlewares/admin.middleware");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  stockIn,
  stockOut
} = require("../controllers/inventory.controller");

const router = express.Router();

// Admin-protected routes
const { protect, admin } = require("../middleware/authMiddleware");


// 🔐 Admin-only inventory routes
router.use(protect, admin);

// Inventory CRUD
router.post("/", createItem);
router.get("/", getItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

// Stock operations
router.post("/:id/in", stockIn);
router.post("/:id/out", stockOut);



module.exports = router;
