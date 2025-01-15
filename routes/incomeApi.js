import Router from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { addIncome, getIncomes } from "../controllers/incomeController.js";
const router = Router();

router.get("/incomes", authenticateUser, getIncomes);
router.post("/income/add", authenticateUser, addIncome);
router.post("/income/delete/:id", authenticateUser, addIncome);

export default router;
