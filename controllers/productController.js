const Product = require("../models/product");

// Get all products
const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Get product by ID
const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Create a new product
const createProduct = async (req, res) => {
	const { name, price, description, imageUrl, stock } = req.body;

	try {
		const newProduct = new Product({
			name,
			price,
			description,
			imageUrl,
			stock,
		});

		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Update a product
const updateProduct = async (req, res) => {
	const { name, price, description, imageUrl, stock } = req.body;

	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.name = name || product.name;
		product.price = price || product.price;
		product.description = description || product.description;
		product.imageUrl = imageUrl || product.imageUrl;
		product.stock = stock || product.stock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// Delete a product
const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await product.remove();
		res.json({ message: "Product removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
