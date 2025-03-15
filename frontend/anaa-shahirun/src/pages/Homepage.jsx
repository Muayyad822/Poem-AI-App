import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">مرحبًا بكم في تطبيق الشعر العربي</h1>
      <p className="text-lg text-gray-700 mb-8">اكتب قصائدك بمساعدة الذكاء الاصطناعي.</p>
      <button 
        onClick={handleGetStarted}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        ابدأ الكتابة
      </button>
    </div>
  );
};

export default Homepage;