import Poem from "../models/Poem.js";

// Get all poems
const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find();
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single poem
const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
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
    const { title, content, author } = req.body;

    const poem = new Poem({
      title,
      content,
      author: author || "Anonymous", // Default to "Anonymous" if no author is provided
    });

    const savedPoem = await poem.save();
    res.status(201).json(savedPoem);
  } catch (error) {
    console.error("Error creating poem:", error);
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

    await poem.remove();
    res.json({ message: "Poem deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllPoems, getPoemById, createPoem, updatePoem, deletePoem };
