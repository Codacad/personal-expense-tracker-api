import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import expenseApi from "./routes/expenseApi.js";
import incomeApi from "./routes/incomeApi.js";
import authApi from "./routes/authApi.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbConnection();
setInterval(() => {
  dbConnection();
}, 1000 * 60 * 60 * 24);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://personal-expense-tracker-9dea7.web.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", authApi);
app.use("/api", expenseApi);
app.use("/api", incomeApi);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
