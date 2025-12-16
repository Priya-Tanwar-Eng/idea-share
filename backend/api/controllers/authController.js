const User = require("../models/user");  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const loginUser = async (req, res) => {
  try {
    console.log("User model:", User);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "fail" });
  }
};
module.exports = { registerUser, loginUser };
