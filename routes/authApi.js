import { Router } from "express";
import { register, login, logout, forgotPassword } from "../controllers/authController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

export default router;