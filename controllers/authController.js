import User from "../models/user.js";
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// User Regiteration
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      const user = await User.create({ name, email, password });
      if (user) {
        return res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } else {
        return res.status(400).send({ message: "Invalid user data" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error.message.split(":")[2] });
  }
});

// User Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      expires: Date.now() + 60 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message.split(":")[2] });
  }
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.status(200).send({ message: "Logged out" });
});

// Forgot Password
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const otp = generateOTP();
      const newOtp = {
        email,
        otp,
      };
      const createdOtp = await OTP.create(newOtp);
      if (createdOtp) {
        const transport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
          },
        });
        transport.sendMail(
          {
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: "Reset Password",
            text: `Your password reset OPT is: ${otp}`,
          },
          (err, data) => {
            if (err) {
              return res.status(404).send(err);
            } else {
              return res.status(200).send({
                message: "OTP has been sent",
                data,
                user: {
                  email: createdOtp.email,
                  expires: createdOtp.expiresAt,
                },
              });
            }
          }
        );
      } else {
        return res.status(401).send({ message: "OTP not sent" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Validate OTP
export const valitdateOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpUser = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(otpUser);
    if (otpUser.length > 0) {
      if (otp !== otpUser[0].otp) {
        return res.status(404).send({ message: "Invalid OTP" });
      } else {
        return res
          .status(201)
          .send({ id: otpUser._id, message: "OPT validated successfully" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
