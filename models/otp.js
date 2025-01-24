import { Schema, model } from "mongoose";
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 300000,
    },
  },
  { timestamps: true }
);

const OTP = model("OTP", otpSchema);

export default OTP;
