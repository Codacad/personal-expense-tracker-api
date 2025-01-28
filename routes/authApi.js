import { Router } from "express";
import {
  register,
  login,
  logout,
  sendOtp,
  valitdateOtp,
  resetPassword,
} from "../controllers/authController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendOtp);
router.post("/validate-otp", valitdateOtp);
router.patch("/reset-password", resetPassword);

export default router;
