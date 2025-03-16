import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://poem-ai-app-bjrx.onrender.com/api/auth/me", {
          withCredentials: true, // ✅ Sends cookies with request
        });
        setUser(res.data); // ✅ Store user
      } catch (error) {
        console.error("User not authenticated", error);
        setUser(null);
      }
      setLoading(false); // ✅ Stop loading after request
    };

    checkAuth();
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    try {
      await axios.post("https://poem-ai-app-bjrx.onrender.com/api/auth/logout", {}, {
        withCredentials: true
      });
      setUser(null);
      // Add navigation to login
      window.location.href = '/auth';
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children} {/* ✅ Wait until loading is complete */}
    </AuthContext.Provider>
  );
};