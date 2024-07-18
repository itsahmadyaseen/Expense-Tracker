import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createIncome,
  deleteIncome,
  getIncomeById,
  getIncome,
  updateIncome,
} from "../controller/income.controller.js";

const router = Router();

router.route("/create-income").post(verifyJWT, createIncome);
router.route("/get-incomes").get(verifyJWT, getIncome);
router.route("/delete-income/:id").delete(verifyJWT, deleteIncome);
router.route("/update-income/:id").put(verifyJWT, updateIncome);
router.route("/get-income/:id").get(verifyJWT, getIncomeById);

export default router;
