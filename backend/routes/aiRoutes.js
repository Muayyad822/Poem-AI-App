import express from 'express';
import aiController from '../controllers/aiController.js';

const router = express.Router();

router.get('/getRhymes', aiController.getRhymes);
router.post('/generatePoetry', aiController.generatePoetry);
router.post('/validatePoetry', aiController.validatePoetry);
router.post('/analyzePoetryStructure', aiController.analyzePoetryStructure);

export default router;
