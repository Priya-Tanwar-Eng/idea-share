
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn.js");

dotenv.config();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://idea-share-3joy.vercel.app" // frontend URL
  ],
  credentials: true
}));

app.use(express.json());

connectDB();

const authRoutes = require("./routes/authRoutes.js");
const ideaRoutes = require("./routes/ideaRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
