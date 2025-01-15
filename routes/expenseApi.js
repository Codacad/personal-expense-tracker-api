import Router from "express";
const router = Router();
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expenseController.js";
router.get("/expenses", authenticateUser, getExpenses);
router.post("/expense/add", authenticateUser, addExpense);
router.post("/expense/delete/:id", authenticateUser, deleteExpense);
export default router;
