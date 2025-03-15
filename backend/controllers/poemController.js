import Poem from "../models/Poem.js";
import User from "../models/User.js";

// Get all poems
const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find().populate("author", "username");
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single poem
const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id).populate("author", "username");
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new poem
const createPoem = async (req, res) => {
  try {
    console.log("User making request:", req.user); // ✅ Log the user making the request
    const { title, content } = req.body;

    if (!req.user || !req.user.userId) {  // ✅ Ensure user exists
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    const poem = new Poem({
      title,
      content,
      author: req.user.userId
    });

    const savedPoem = await poem.save();
    
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { poems: savedPoem._id } }
    );

    res.status(201).json(savedPoem);
  } catch (error) {
    console.error("Error creating poem:", error);  // ✅ Log the error
    res.status(500).json({ message: error.message });
  }
};


// Update poem
const updatePoem = async (req, res) => {
  try {
    const { title, content } = req.body;
    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    if (poem.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    poem.title = title;
    poem.content = content;
    
    const updatedPoem = await poem.save();
    res.json(updatedPoem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete poem
const deletePoem = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    
    if (poem.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await poem.remove();
    
    // Remove poem from user's poems array
    await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { poems: req.params.id } }
    );

    res.json({ message: "Poem deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllPoems, getPoemById, createPoem, updatePoem, deletePoem };

