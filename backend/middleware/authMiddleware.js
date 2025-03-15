import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authenticateToken;


// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ message: "No authentication token, access denied" });
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token verification failed, authorization denied" });
//   }
// };

// export default auth;
