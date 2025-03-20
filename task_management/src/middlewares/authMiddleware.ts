import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return; // Ensure the function stops execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // Attach user info to the request object
    next(); // Call next middleware
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
    return; // Ensure function stops execution
  }
}
