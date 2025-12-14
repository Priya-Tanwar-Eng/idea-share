const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/dbConn");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://idea-share-3joy.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// connectDB();

const authRoutes = require("../routes/authRoutes");
const ideaRoutes = require("../routes/ideaRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

module.exports = app;
