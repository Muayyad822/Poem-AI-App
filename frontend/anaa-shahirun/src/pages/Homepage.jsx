import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
        مرحبًا بكم في تطبيق الشعر العربي
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-8 text-center max-w-2xl">
        اكتب قصائدك بمساعدة الذكاء الاصطناعي.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
      >
        ابدأ الكتابة
      </button>
    </div>
  );
};

export default Homepage;
