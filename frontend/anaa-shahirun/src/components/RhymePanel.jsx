import React, { useState } from "react";
import { getRhymes } from "../api/aiApi";
import { toast } from "react-hot-toast";

const RhymePanel = ({ word }) => {
  const [rhymes, setRhymes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentWord, setCurrentWord] = useState(word || "");

  const handleGenerateRhymes = async () => {
    if (!currentWord?.trim()) {
      toast.error("Please enter a word first");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await getRhymes(currentWord);
      if (!response?.rhymes) {
        throw new Error("Invalid response format");
      }
      setRhymes(response.rhymes);
    } catch (err) {
      console.error("Failed to fetch rhymes:", err);
      const errorMessage = "فشل تحميل اقتراحات القافية";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-3 sm:p-4 bg-gray-100 rounded-lg shadow-md" dir="rtl">
      <h3 className="font-bold text-base sm:text-lg mb-3">اقتراحات القافية</h3>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder="أدخل كلمة..."
          className="p-2 border rounded w-full sm:flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerateRhymes}
          disabled={loading || !currentWord.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 w-full sm:w-auto"
        >
          ابحث
        </button>
      </div>
      
      {loading && <p className="text-gray-600 text-center">جارٍ التحميل...</p>}
      {!loading && !error && rhymes.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {rhymes.map((rhyme, index) => (
            <li 
              key={`rhyme-${index}`}
              className="p-2 hover:bg-gray-200 rounded cursor-pointer text-center"
              onClick={() => {
                navigator.clipboard.writeText(rhyme);
                toast.success("تم نسخ الكلمة");
              }}
            >
              {rhyme}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RhymePanel;
