import express from "express";
import poemController from "../controllers/poemController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Import auth middleware

const router = express.Router();

// ✅ Require authentication for all poem routes
router.post("/", authMiddleware, poemController.createPoem);
router.get("/", authMiddleware, poemController.getAllPoems);
router.get("/:id", authMiddleware, poemController.getPoemById);
router.put("/:id", authMiddleware, poemController.updatePoem);
router.delete("/:id", authMiddleware, poemController.deletePoem);

export default router;
