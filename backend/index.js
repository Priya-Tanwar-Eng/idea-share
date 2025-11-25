
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require("./routes/authRoutes");
const ideaRoutes = require("./routes/ideaRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
