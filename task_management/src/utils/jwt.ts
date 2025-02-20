import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "supersecretkey"; 

// Generate JWT Token
export function generateToken(user: { id: number; role: string }) {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
}

// Verify JWT Token
export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
