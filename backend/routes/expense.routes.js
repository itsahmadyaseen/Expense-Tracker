import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controller/expense.controller.js";

const router = Router();

router.route("/create-expense").post(verifyJWT, createExpense);
router.route("/get-expenses").get(verifyJWT, getExpenses);
router.route("/delete-expense/:id").delete(verifyJWT, deleteExpense);
router.route("/update-expense/:id").put(verifyJWT, updateExpense);
router.route("/get-expense/:id").get(verifyJWT, getExpenseById);

export default router;
