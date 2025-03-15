import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./index.css";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen text-center">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/poems/:id"
              element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </AuthProvider>
  );
};

export default App;