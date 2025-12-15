const express = require("express");
const cors = require("cors");

const auth = require("./auth");
const ideas = require("./ideas");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://idea-share-3joy.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/ideas", ideas);

app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
