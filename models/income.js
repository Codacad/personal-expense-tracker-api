import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    source: {
      type: String,
      required: [true, "Income source is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Income category is required"],
      enum: [
        "Salary",
        "Freelance",
        "Business",
        "Investment",
        "Rent",
        "Dividends",
        "Capital Gains",
        "Savings Interest",
        "Pension",
        "Government Benefits",
        "Inheritance",
        "Lottery",
        "Insurance Payout",
        "Gift",
        "Grants",
        "Scholarship",
        "Crowdfunding",
        "Royalties",
        "Consulting",
        "Stock Options",
        "Part-time Job",
        "Bonuses",
        "Referral Income",
        "Affiliate Marketing",
        "Tips",
        "Rental Income",
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

const Income = mongoose.model("Income", incomeSchema);
export default Income;
