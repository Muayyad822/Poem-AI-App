import express from "express";
import authController from "../controllers/authController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route 
router.get("/protected-route", authenticateToken, (req, res) => {
    res.json({ message: "You accessed a protected route!", user: req.user });
});

// Register new user
router.post("/signup", authController.signup);

// Login user 
router.post("/login", authController.login);

// Get user details
router.get("/me", authenticateToken, authController.getMe);

export default router;
