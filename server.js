const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ Add this
const path = require("path");

dotenv.config();
connectDB(); // connect to local MongoDB

const app = express();

// ✅ Enable CORS for frontend origin (Vite usually runs on http://localhost:5173)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
const bookRoutes = require("./routes/bookRoute");
const authRoutes = require("./routes/authRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
