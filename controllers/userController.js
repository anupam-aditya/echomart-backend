const User = require("../models/user");

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

const updateUser = async (req, res) => {
	const { name, email } = req.body;

	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.name = name || user.name;
		user.email = email || user.email;

		const updatedUser = await user.save();
		res.json(updatedUser);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		await user.remove();
		res.json({ message: "User removed" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	getUserById,
	updateUser,
	deleteUser,
};
