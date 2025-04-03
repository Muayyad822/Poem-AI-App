import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generatePoetry } from "../api/aiApi";
import { toast } from "react-hot-toast";

const PoemEditor = () => {
  const { id } = useParams(); // Get poem ID from the URL
  const [poem, setPoem] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch poem from backend
  useEffect(() => {
    const fetchPoem = async () => {
      if (!id) return; // Don't fetch if there's no ID

      try {
        setError(null);

        const response = await axios.get(
          `https://poem-ai-app-bjrx.onrender.com/api/poems/${id}`
        );

        if (!response?.data) {
          throw new Error("Invalid response format");
        }

        setPoem(response.data.content || ""); // Default to empty string if no content
      } catch (err) {
        console.error("Error fetching poem:", err);

        const errorMessage =
          err.response?.status === 404
            ? "لم يتم العثور على القصيدة"
            : "فشل تحميل القصيدة. حاول مرة أخرى.";

        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    fetchPoem();
  }, [id]); // Keeping only `id` in dependencies since this fetches per poem

  const handleInputChange = (e) => {
    const newContent = e.target.value;
    setPoem(newContent);
  };

  const handleGenerateSuggestion = async () => {
    if (!poem.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await generatePoetry(poem);
      
      if (!response?.poem) {
        throw new Error("Invalid response format");
      }
      
      setSuggestion(response.poem);
      toast.success("Generated successfully");
    } catch (err) {
      console.error("Failed to generate suggestions:", err);
      setError(err.message || "Failed to generate suggestions");
      toast.error(err.message || "Failed to generate suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 m-2 bg-gray-100 rounded-lg shadow-md">
        <textarea
          className="w-full h-64 p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="اكتب قصيدتك هنا..."
          value={poem}
          onChange={handleInputChange}
          dir="rtl"
        />
        <div className="mt-6" dir="rtl">
          <div className="flex flex-col justify-between items-center">
            <button
              onClick={handleGenerateSuggestion}
              disabled={loading || !poem.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              توليد اقتراح
            </button>
            <h3 className="text-xl font-bold mt-4 text-blue-600 ">
              اقتراحات الذكاء الاصطناعي
            </h3>
          </div>
          {loading && <p className="text-gray-600">جارٍ التحميل...</p>}
          {!loading && !error && suggestion && (
            <p className="mt-2 text-gray-700">{suggestion}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PoemEditor;
