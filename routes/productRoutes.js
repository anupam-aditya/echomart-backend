const express = require("express");
const {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming only authenticated users can create, update, and delete products

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get a product by ID
router.get("/:id", getProductById);

// Create a new product (protected route)
router.post("/", authMiddleware, createProduct);

// Update a product (protected route)
router.put("/:id", authMiddleware, updateProduct);

// Delete a product (protected route)
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
