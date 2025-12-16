const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login",(req, res) => {
  res.json({
    success: true, 
    token: "dummy-token",
    user: { id: 1, name: "Priya" }
  });
});


module.exports = router;
