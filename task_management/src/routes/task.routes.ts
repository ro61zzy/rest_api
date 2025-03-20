//src/routes/task.routes.ts

import express from "express";
import { getAllTasks, createTask, deleteTask } from "../controllers/task.controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticate, getAllTasks);
// router.post("/", authenticate, createTask);
router.delete("/:id", authenticate, deleteTask);

export default router;
