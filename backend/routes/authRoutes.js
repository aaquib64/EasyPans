const express = require('express');
const passport = require("passport");
const router = express.Router();
const { registerUser, loginUser, verifyOtp, forgotPassword, resetPassword } = require('../controllers/authController.js');
const generateToken = require("../utils/generateToken");
const { protect } = require("../middleware/authMiddleware");
const { createSurvey } = require("../controllers/surveyController");



// Route for user registration
router.post('/register', registerUser);

router.post('/verify-otp', verifyOtp);

// Route for user login
router.post('/login', loginUser);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

// ✅ ADD THIS ROUTE HERE
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Survey submission route
router.post("/survey", createSurvey);



module.exports = router;
