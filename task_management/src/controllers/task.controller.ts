//scr/controllers/task.controller.ts
import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/task.service";

// Fetch all tasks
export async function getAllTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await taskService.getTasks((req as any).user);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

// Create a new task
export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const task = await taskService.createTask({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

// Delete a task
export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
}
