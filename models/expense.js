import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: [true, "Expense title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Groceries",
        "Food",
        "Transport",
        "Housing",
        "Utilities",
        "Entertainment",
        "Health",
        "Education",
        "Food & Drinks",
        "Miscellaneous",
        "Transportation",
      ], // Predefined categories for expenses
      default: "Miscellaneous",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now, // Default to the current date
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense; 
