import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">Anaa Shahirun</h1>
            <p className="text-xs sm:text-sm text-center">ذكاء اصطناعي للشعر العربي</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
