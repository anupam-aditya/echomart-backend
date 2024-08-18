const express = require("express");
const {
	getUserById,
	updateUser,
	deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user by ID (protected route)
router.get("/:id", authMiddleware, getUserById);

// Update user information (protected route)
router.put("/:id", authMiddleware, updateUser);

// Delete a user (protected route)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
