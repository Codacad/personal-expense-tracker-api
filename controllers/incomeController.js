import asyncHandler from "express-async-handler";
import Income from "../models/income.js";
export const getIncomes = asyncHandler(async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).populate(
      "user",
      "name email"
    );
    res.status(200).send(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const addIncome = asyncHandler(async (req, res) => {
  try {
    const income = await Income.create({ ...req.body, user: req.user.id });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteIncome = asyncHandler(async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
