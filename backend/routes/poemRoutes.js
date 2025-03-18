import express from "express";
import poemController from "../controllers/poemController.js";
// import authMiddleware from "../middleware/authMiddleware.js"; // ✅ Import auth middleware

const router = express.Router();

// ✅ Require authentication for all poem routes
router.post("/", poemController.createPoem);
router.get("/", poemController.getAllPoems);
router.get("/:id", poemController.getPoemById);
router.put("/:id", poemController.updatePoem);
router.delete("/:id", poemController.deletePoem);

export default router;
