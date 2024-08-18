const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Make sure the 'uploads' directory exists
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}${path.extname(file.originalname)}`);
	},
});

// Initialize upload
const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Check file type
		const filetypes = /jpeg|jpg|png|gif/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb("Error: Images Only!");
		}
	},
	limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

module.exports = upload;
