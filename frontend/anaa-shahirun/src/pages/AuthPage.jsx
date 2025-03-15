import { useState, useContext } from "react";
import { login, signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      let response;
      if (isLogin) {
        response = await login(username, password);
      } else {
        response = await signup(username, password);
      }

      if (response.token) {
        console.log("Auth successful:", response);
        toast.success(isLogin ? "Login successful" : "Signup successful");

        // ✅ Store user in React Context
        loginUser(response.user, response.token);

        // ✅ Navigate to homepage
        navigate("/");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Auth failed:", error);
      toast.error("Authentication failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
      <div className="flex flex-col items-center gap-6 mt-4 bg-gray-100 p-8 rounded-lg shadow-lg w-96">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir="ltr"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir="ltr"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4" dir="ltr">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;



// import React, { useState } from "react";
// import { login } from "../api/authApi";

// const AuthPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await login(username, password);
//       console.log("Login successful:", response);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h1 className="text-4xl font-bold text-blue-600 mb-8">تسجيل الدخول</h1>
//       <div className="flex flex-col items-center gap-6 mt-4 bg-gray-100 p-8 rounded-lg shadow-lg w-96">
//           <input
//             type="text"
//             placeholder="اسم المستخدم"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="p-3 border-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right bg-gray-50 hover:bg-gray-100 transition duration-300"
//           />
//           <input
//             type="password"
//             placeholder="كلمة المرور"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-3 border-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right bg-gray-50 hover:bg-gray-100 transition duration-300"
//           />
//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//           >
//             الدخول
//           </button>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;