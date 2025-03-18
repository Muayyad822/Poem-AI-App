import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./index.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-center">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/poems/:id" element={<EditorPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
