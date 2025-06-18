// 📦 Import Dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ CORS middleware for Cross-Origin requests
const path = require("path");

// 🔧 Load environment variables from .env file
dotenv.config();

// 🔗 Connect to MongoDB
connectDB();

const app = express();

// ✅ Enable CORS for frontend origin (e.g., Vite: http://localhost:5173)
app.use(cors({
  origin: "http://localhost:5173", // 🔁 Change this to your frontend production URL on deploy
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
  credentials: true // ✅ Allow sending cookies, authorization headers, etc.
}));

// ✅ Parse incoming JSON requests
app.use(express.json());

// 🛣️ Setup Routes
const bookRoutes = require("./routes/bookRoute"); // 📚 Book-related APIs
const authRoutes = require("./routes/authRoutes"); // 🔐 Auth-related APIs

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// 🚀 Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
