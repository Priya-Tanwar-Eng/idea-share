const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX HERE 👇
    req.userId = decoded.id || decoded._id;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
