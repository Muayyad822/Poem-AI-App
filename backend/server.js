import dotenv from "dotenv";
// Load environment variables FIRST, before any other imports
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Connect to MongoDB BEFORE setting up middleware
connectDB();

const app = express();

// ✅ Trust proxy for proper client IP handling
app.set("trust proxy", 1);

// ✅ Middleware
const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5176",
    "https://poem-ai-app.vercel.app",
    "https://poem-ai-app.vercel.app/auth"
  ];
  
  // More secure CORS configuration
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['set-cookie'],
    maxAge: 86400 // 24 hours
  };

  app.use(cors(corsOptions));
  
app.use(express.json()); // ✅ Parse JSON body
app.use(cookieParser()); // ✅ Parse cookies

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Add security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/poems", poemRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Default route (for testing server)
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.json({ message: "Logged out" });
});  

// After dotenv.config();
console.log('Environment check:', {
    hasGoogleKey: !!process.env.GOOGLE_API_KEY,
    envPath: process.cwd() // This will show where Node is looking for .env
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
