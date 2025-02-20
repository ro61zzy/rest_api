//src/controllers/auth.controllers.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await authService.registerUser(username, email, password);
    return res.status(201).json(user);
  } catch (error) {
    next(error); // Pass errors to Express error handler
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await authService.loginUser(email, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

