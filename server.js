// 📦 Import Dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ CORS middleware for cross-origin requests

dotenv.config(); // 🔧 Load environment variables

connectDB(); // 🔗 Connect to MongoDB

const app = express();

// ✅ CORS Setup for Localhost and Vercel Frontend
app.use(cors({
  origin: [
    "http://localhost:5173", // Local development
    "https://frontend-tsa9.vercel.app" // 🔁 Your Vercel frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // ✅ Parse JSON request bodies

// 🛣️ Import Routes
const bookRoutes = require("./routes/bookRoute");
const authRoutes = require("./routes/authRoutes");

// 🛣️ Use Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// 🟢 Root route to verify deployment
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// 🚀 Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
