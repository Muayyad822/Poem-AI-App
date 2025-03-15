import express from 'express';
import aiController from '../controllers/aiController.js';

const router = express.Router();

router.post('/generatePoetry', aiController.generatePoetry);
router.post('/validatePoetry', aiController.validatePoetry);
router.post('/getRhymes', aiController.getRhymes);  
router.post('/analyzePoetryStructure', aiController.analyzePoetryStructure);

export default router;


// import express from "express";
// import aiController from "../controllers/aiController.js";
// import authMiddleware from "../middleware/authMiddleware.js"; // Add auth middleware

// const router = express.Router();

// // Generate poetry suggestions
// router.post("/generate-poetry", authMiddleware, aiController.generatePoetry);

// // Get rhyme suggestions 
// router.get("/rhyme-suggestions", authMiddleware, aiController.getRhymes);

// // Validate poetry rules
// router.post("/validate-poetry", authMiddleware, aiController.validatePoetry);

// // Analyze poetry structure
// router.post("/analyze-structure", authMiddleware, aiController.analyzePoetryStructure);

// export default router;