import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container text-center" dir="ltr">
        <Link to="https://x.com/MuizMuayyad">
          <p>&copy; AbdulMuiz AlMuayyad - Anaa Shahirun. <br /> All rights reserved 2025 </p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
