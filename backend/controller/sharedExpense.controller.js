import SharedExpense from "../models/sharedExpense.model.js";
import Group from "../models/group.model.js";
import Expense from "../models/expense.model.js";
import Income from "../models/income.model.js";

export const createSharedExpense = async (req, res) => {
  try {
    const { paidBy, description, amount, date, groupId } = req.body;

    // console.log("user id", paidBy);

    if (!paidBy || !description || !amount || !groupId) {
      console.log(
        "Provide all information ",
        amount,
        paidBy,
        description,
        groupId
      );
      return res
        .status(404)
        .json({ message: "Provide all information", data: null });
    }

    const newSharedExpense = new SharedExpense({
      paidBy: paidBy,
      description: description,
      amount: amount,
      date: date || Date.now(),
      group: groupId,
    });

    console.log("new shared expense", newSharedExpense);

    const group = await Group.findById(groupId);
    const userArray = group.members;

    const totalMembers = userArray.length;
    console.log("total here members", totalMembers);
    const newAmount = Math.round(amount / totalMembers);

    const paidUserAmount = amount - newAmount;
    console.log("paidUserAmount", paidUserAmount);

    const incomeForPaidUser = new Income({
      user: paidBy,
      description: description,
      amount: paidUserAmount,
      date: date || Date.now(),
    });

    console.log("incomeForPaidUser", incomeForPaidUser);

    await incomeForPaidUser.save();

    console.log("Group members: ", userArray);
    const newUsersToAddExpense = userArray.filter(
      (user) => user._id.toString() !== paidBy
    );

    console.log("new user array without paid user", newUsersToAddExpense);

    await newSharedExpense.save();

    // Save individual expenses for each user
    for (let user of newUsersToAddExpense) {
      const userId = user;

      const newExpense = new Expense({
        user: userId,
        description: description,
        amount: Math.round(newAmount),
        date: date || Date.now(),
      });

      try {
        await newExpense.save();
        console.log("New Expense created for user:", userId, newExpense);
      } catch (err) {
        console.log("Error creating individual expense for user:", userId, err);
        return res
          .status(500)
          .json({ message: "Error creating individual expense", data: err });
      }
    }

    console.log("New Shared Expense created : ", newSharedExpense);
    return res
      .status(201)
      .json({ message: "New Shared Expense created ", data: newSharedExpense });
  } catch (error) {
    console.log("Error creating shared expense ", error);
    return res
      .status(500)
      .json({ message: "Error creating shared expense", data: error });
  }
};

export const deleteSharedExpense = async (req, res) => {
  try {
    const sharedExpenseId = req.params.id;
    console.log("sharedExpenseId: ", sharedExpenseId);
    if (!sharedExpenseId) {
      console.log("Provide expense id");
      return res.status(400).json({ message: "Provide Expense id" });
    }
    const sharedExpenseDetails = await SharedExpense.findByIdAndDelete(
      sharedExpenseId
    );
    if (!sharedExpenseDetails) {
      return res.status(404).json({ message: "Shared expense not found" });
    }
    console.log("sharedExpenseDetails: ", sharedExpenseDetails);


    const groupId = sharedExpenseDetails.group;
    const groupDetails = await Group.findById(groupId);
    if (!groupDetails) {
      return res.status(404).json({ message: "Group not found" });
    }

    const userArray = groupDetails.members;
    if (!userArray || userArray.length === 0) {
      return res.status(404).json({ message: "No members found in the group" });
    }

    const paidUserId = await sharedExpenseDetails.paidBy;
    console.log("paid user id", paidUserId);
    const paidUserQuery = {
      user: paidUserId,
      description: sharedExpenseDetails.description,
      amount: Math.round(
        sharedExpenseDetails.amount -
          sharedExpenseDetails.amount / userArray.length
      ),
    };
    const paiduserDetails = await Income.findOneAndDelete(paidUserQuery);

    console.log("paid user deleted", paiduserDetails);
    if (!paiduserDetails) {
      console.log("Cant delete paid user");
    }

    for (let user of userArray) {
      const userId = user;
      if (userId != paidUserId) {
        const query = {
          user: userId,
          description: sharedExpenseDetails.description,
          amount: Math.round(sharedExpenseDetails.amount / userArray.length),
        };
        console.log("Delete Query: ", query);

        try {
          const deleteResponse = await Expense.findOneAndDelete(query);
          if (!deleteResponse) {
            console.log(
              "No matching individual expense found for user:",
              userId
            );
          } else {
            console.log("Individual Expense Deleted: ", deleteResponse);
          }
        } catch (error) {
          console.log(
            "Error deleting individual expense for user:",
            userId,
            error
          );
          return res.status(500).json({
            message: "Error deleting individual expense",
            data: error,
          });
        }
      }
    }
    console.log("Shared expense deleted");
    return res.status(200).json({ message: "Shared Expense deleted" });
  } catch (error) {
    console.log("Error deleting shared expense", error);
    return res
      .status(500)
      .json({ message: "Error deleting Shared Expense", data: error });
  }
};

export const getSharedExpenses = async (req, res) => {
  try {
    const response = await SharedExpense.find().sort({date:-1});
    if (!response) {
      console.log("Cannot get shared expenses", response);
      return res.status(404).json("Cannot get shared expenses");
    }
    console.log(response);
    return res
      .status(200)
      .json({ message: "Fetched shared expenses", data: response });
  } catch (error) {
    console.log("Error fetching shared expense", error);
    return res
      .status(500)
      .json({ message: "Error fetching shared expenses", data: error });
  }
};

export const getSharedExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const sharedExpense = await SharedExpense.findById(expenseId);
    console.log("sharedExpense ", sharedExpense);

    if (!sharedExpense) {
      console.log("Unable to get shared expense");
      return res
        .status(400)
        .json({ message: "Unable to get shared expense", data: sharedExpense });
    }

    console.log("Fetched shared expense", sharedExpense);
    return res
      .status(400)
      .json({ message: "Fetched shared expense", data: sharedExpense });
  } catch (error) {
    console.log("Error fetching shared expense", error);
    return res
      .status(400)
      .json({ message: "Error fetching shared expense", data: error });
  }
};
