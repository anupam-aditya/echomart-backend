const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", require("./routes/productRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// MONGO_URI="mongodb+srv://anupamaditya99:193714$Echomart@echomart.vsp7uno.mongodb.net/?retryWrites=true&w=majority&appName=Echomart"
