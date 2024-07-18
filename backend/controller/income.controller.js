import Income from "../models/income.model.js";

export const createIncome = async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    if (!req.user || !req.user.id) {
      console.log("User id not provided", req.user?.id);
      return res.status(404).json({ message: "Invalid user id" });
    }
    const userId = req.user.id;
    const newIncome = new Income({
      user: userId,
      description: description,
      amount: amount,
      date: date || Date.now(),
    });
    await newIncome.save();
    console.log("Income created", newIncome);
    return res.status(201).json(newIncome);
  } catch (error) {
    console.log("Income creation failed", error);
    return res.status(401).json(error);
  }
};

export const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user id", userId);
    if (!userId) {
      console.log("User id not provided", userId);
      return res.status(404).json(userId);
    }
    const income = await Income.find({ user: userId });
    if (!income) {
      console.log("Unable to get incomes");
      return res.status(401).json(income);
    }
    console.log("Income fetched", income);
    return res.status(200).json(income);
  } catch (error) {
    console.log("Income fetch failed", error);
    return res.status(401).json(error);
  }
};

export const getIncomeById = async (req, res) => {
  try {
    const incomeId = req.params.id;
    if (!incomeId) {
      console.log("Income id not provided", incomeId);
      return res.status(404).json(incomeId);
    }

    const income = await Income.findById(incomeId);

    console.log("Income fetched", income);
    return res.status(200).json(income);
  } catch (error) {
    console.log("Unable to get income", error);
    return res.status(400).json(error);
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    if (!incomeId) {
      console.log("Income id invalid", incomeId);
      return res.status(404).json(incomeId);
    }
    const response = await Income.findByIdAndDelete(incomeId);
    if (!response) {
      console.log("Income deletion failed", response);
      return res.status(401).json(response);
    }
    console.log("Income deleted ", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(" failed to delete income ", error);
    return res.status(401).json(error);
  }
};

export const updateIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const { description, amount, date } = req.body;
    if (!incomeId) {
      console.log("Income id not provided", incomeId);
      return res.status(400).json(incomeId);
    }
    const response = await Income.findByIdAndUpdate(incomeId, {
      description: description,
      amount: amount,
      date: date || Date.now(),
    } , { new: true });
    if (!response) {
      console.log("Income updation failed", response);
      return res.status(404).json(response);
    }
    console.log("Income updated ", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Income updation failed", error);
    return res.status(500).json(error);
  }
};
