const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn.js");

dotenv.config();

const app = express(); // ✅ MISSING LINE (VERY IMPORTANT)

// middlewares
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://idea-share-3joy.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// preflight fix
app.options("*", cors());

// db
connectDB();

// routes
const authRoutes = require("./routes/authRoutes.js");
const ideaRoutes = require("./routes/ideaRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

// local server only
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// vercel
module.exports = app;
