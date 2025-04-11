// src/routes/authRoutes.ts
import { Router } from "express";
import { signUp, signIn } from "../controllers/authController";

const router = Router();

// Route for user signup
router.post("/signup", signUp);

// Route for user signin
router.post("/signin", signIn);

export default router;
