import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware to protect routes
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded; // Attach user to request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}
