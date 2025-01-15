import asyncHandler from "express-async-handler";
import Expense from "../models/expense.js";
export const getExpenses = asyncHandler(async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate("user", "name email");
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const addExpense = asyncHandler(async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user.id });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteExpense = asyncHandler(async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({_id: req.params.id, user: req.user.id});
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
