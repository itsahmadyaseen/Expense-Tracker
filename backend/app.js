import express from "express";
import cors from "cors";
import { connectDB } from "./database/connection.js";
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import incomeRouter from "./routes/income.routes.js";
import groupRouter from "./routes/group.routes.js";
import sharedExpenseRouter from "./routes/sharedExpense.routes.js";
import shareRouter from "./routes/share.routes.js";
import payShareRouter from "./routes/payshare.routes.js";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/incomes", incomeRouter);
app.use("/api/groups", groupRouter);
app.use("/api/share", sharedExpenseRouter);
app.use("/api/new-shares", shareRouter);
app.use("/api/pay-shares", payShareRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Running on port", process.env.PORT);
});
