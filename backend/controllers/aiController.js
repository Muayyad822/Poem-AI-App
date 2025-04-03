import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env') });

const API_KEY = process.env.GEMINI_API_KEY;

// Add error handling for API key
if (!API_KEY) {
  console.error("GEMINI_API_KEY is not configured");
  throw new Error("AI service configuration error");
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to generate Arabic poetry
const generatePoetry = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const arabicPrompt = `
    موضوع القصيدة: ${prompt}

    اكتب قصيدة عربية فصيحة تتكون من ثلاثة أبيات.
    يجب أن تكون القصيدة:
    - باللغة العربية الفصحى
    - ملتزمة بالوزن والقافية
    - معبرة عن الموضوع

    القصيدة:
    `;

    const result = await model.generateContent(arabicPrompt);
    const response = await result.response;
    const generatedText = response.text();
    
    const verses = generatedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    res.json({ poem: verses.join('\n'), verses: verses.length });

  } catch (error) {
    console.error("Poetry Generation Error:", error);
    const errorMessage = error.message?.includes('quota') ? 
      "AI service quota exceeded" : 
      error.message?.includes('timeout') ? 
        "AI service timeout" : 
        "AI service error";
    
    res.status(500).json({
      error: errorMessage,
      details: error.message
    });
  }
};

// Function to get rhyming words
const getRhymes = async (req, res) => {
  try {
    const { word } = req.query;
    if (!word) {
      return res.status(400).json({ error: "Word parameter is required" });
    }

    console.log('Processing word:', word);

    const rhymePrompt = `
    أعطني خمس كلمات عربية فصيحة تقفى مع الكلمة التالية: ${word}

    الشروط:
    - يجب أن تكون الكلمات صحيحة لغويًا.
    - يجب أن تنتهي بنفس القافية.
    - كل كلمة في سطر منفصل.

    الكلمات:
    `;

    const result = await model.generateContent(rhymePrompt);
    const response = await result.response;
    const generatedText = response.text();
    
    const rhymes = generatedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    console.log('Generated rhymes:', rhymes);
    
    return res.json({ rhymes });

  } catch (error) {
    console.error("Rhyme Generation Error:", error);
    return res.status(500).json({
      error: "Rhyme generation failed",
      details: error.message || "Service unavailable"
    });
  }
};

// Function to validate poetry structure
const validatePoetry = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const validationPrompt = `تحليل القصيدة التالية للتحقق من الوزن والقافية والصحة اللغوية:
    
    القصيدة: 
    ${text}

    قدم تقريرًا يوضح البحر العروضي المستخدم، حرف الروي، ومدى التزام النص بالقواعد الشعرية.
    `;

    const result = await model.generateContent(validationPrompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({ analysis: analysis.trim() });

  } catch (error) {
    console.error("Poetry Validation Error:", error);
    res.status(500).json({
      error: "Poetry validation failed",
      details: error.message || "Service unavailable"
    });
  }
};

// Function to analyze poetry structure
const analyzePoetryStructure = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const analysisPrompt = `
    تحليل هيكل القصيدة العربية التالية:
    
    ${text}

    قدم تحليلًا يشمل:
    - البحر العروضي المستخدم.
    - حرف الروي والقافية.
    - عدد الأبيات والشطور.
    - أي أخطاء عروضية أو نحوية.
    `;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({ analysis: analysis.trim() });

  } catch (error) {
    console.error("Poetry Structure Analysis Error:", error);
    res.status(500).json({
      error: "Poetry analysis failed",
      details: error.message || "Service unavailable"
    });
  }
};

export default {
  generatePoetry,
  validatePoetry,
  getRhymes,
  analyzePoetryStructure
};
