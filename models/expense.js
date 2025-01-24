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
      required: [true, "Category is required"],
      enum: [
        "Rent",
        "Utilities",
        "Groceries",
        "Transportation",
        "Insurance",
        "Healthcare",
        "Debt Repayment",
        "Education",
        "Childcare",
        "Entertainment",
        "Dining Out",
        "Travel",
        "Clothing",
        "Personal Care",
        "Subscriptions",
        "Gifts",
        "Charity",
        "Home Maintenance",
        "Office Supplies",
        "Marketing",
        "Legal Fees",
        "Taxes",
        "Investments",
        "Savings",
        "Loan Payments",
        "Technology",
        "Fitness",
        "Pets",
        "Miscellaneous",
        "Other",
      ],      
     
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
