import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://poem-ai-app-bjrx.onrender.com/api/poems");
        setPoems(response.data); // ✅ Store poems in state
      } catch (error) {
        console.error("Failed to fetch poems:", error);
        toast.error("فشل تحميل القصائد. حاول مرة أخرى."); // ✅ Show error message
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const handleNewPoem = async () => {
    try {
      const response = await axios.post("https://poem-ai-app-bjrx.onrender.com/api/poems", {
        title: "قصيدة جديدة",
        content: " ",
      });

      if (response.data && response.data._id) {
        navigate(`/poems/${response.data._id}`);
      } else {
        toast.error("فشل في الحصول على معرف القصيدة الجديدة.");
      }
    } catch (error) {
      console.error("Failed to create new poem:", error);
      toast.error("فشل إنشاء القصيدة. حاول مرة أخرى.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-3 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold">لوحة التحكم</h1>
      <button
        onClick={handleNewPoem}
        className="mt-4 w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
      >
        قصيدة جديدة
      </button>

      <div className="mt-8 grid gap-4">
        {poems.length === 0 ? (
          <div className="text-center p-4 sm:p-8 border rounded shadow">
            <p className="text-lg sm:text-xl text-gray-600">لا توجد قصائد بعد</p>
            <p className="mt-2 text-sm sm:text-base text-gray-500">انقر على زر "قصيدة جديدة" لإنشاء أول قصيدة لك</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {poems.map((poem) => (
              <div
                key={poem._id}
                className="p-4 border rounded shadow hover:shadow-md transition duration-300 cursor-pointer"
                onClick={() => navigate(`/poems/${poem._id}`)}
              >
                <h2 className="text-lg sm:text-xl font-semibold">{poem.title}</h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-3">{poem.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
