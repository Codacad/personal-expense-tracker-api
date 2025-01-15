import User from "../models/user.js";
// import { authToken } from "../middlewares/authMiddleware";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
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
      { expiresIn: "30d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Enable in production
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none", // Enable in production
    });
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // token: authToken(user._id),
    });
  } catch (error) {
    return res.status(500).send({ message: error.message.split(":")[2] });
  }
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "Logged out" });
});
