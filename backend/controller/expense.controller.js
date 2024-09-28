import Expense from "../models/expense.model.js";
import { ObjectId } from "mongodb";

export const createExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(400).send("User information is missing");
    }

    const newExpense = new Expense({
      user: req.user.id,
      description: description,
      amount: amount,
      date: date || Date.now(),
    });
    const expense = await newExpense.save();
    console.log("Expense created");
    return res.status(201).json(expense);
  } catch (error) {
    console.log("Unable to create expense", error);
    return res.status(500).json(error);
  }
};

export const getExpenses = async (req, res) => {
  try {
    let userId = req.user.id;

    const expenses = await Expense.find({ user: userId }).sort({
      date: -1,
    });
    // console.log(expenses);
    return res
      .status(200)
      .json({ message: "Expenses fetched", data: expenses });
  } catch (error) {
    console.log("Unable to get expenses", error);
    return res.status(500).json({ message: "Unable to get expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deleteExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deleteExpense) {
      console.log("Deletion failed");
      return res.status(400).json("Deletion failed");
    }
    console.log("Blog deleted");
    return res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.log("Unable to delete expense", error);
    return res.status(500).json({ message: "Unable to delete expense" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;
    const response = await Expense.findByIdAndUpdate(id, {
      description: description,
      amount: amount,
      date: date,
    });

    console.log("User updated ");
    return res.status(200).json("User updated");
  } catch (error) {
    console.log("User updation failed ", error);
    return res.status(500).json({ error });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const getExpense = await Expense.findById(id);
    if (!getExpense) {
      console.log("User fetch failed ", getExpense);
      return res.status(404).json({ message: "Expense fetch failed" });
    }
    console.log("Expense fetched");
    return res.status(200).json(getExpense);
  } catch (error) {
    console.log("Expense fetch failed ", error);
    return res.status(500).json(error.message);
  }
};
