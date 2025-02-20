import express from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
