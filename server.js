// 📦 Import Dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-tsa9.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
const bookRoutes = require("./routes/bookRoute");
const authRoutes = require("./routes/authRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// ✅ Handle unknown routes (optional)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
