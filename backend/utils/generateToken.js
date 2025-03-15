import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // Generate JWT token that expires in 30 days
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
