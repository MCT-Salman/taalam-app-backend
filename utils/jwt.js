import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export const generateToken = (payload) => {
  // بدون expiresIn → التوكن دائم
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
