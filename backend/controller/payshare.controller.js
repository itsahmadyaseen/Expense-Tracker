import { mongoose } from "mongoose";
import PayShareInd from "../models/payshareInd.model.js";
import Share from "../models/share.model.js";
import User from "../models/user.model.js";

export const createShare = async (req, res) => {
  const { description, amount, paymentObject, expenseObject } = req.body;

  console.log("asdniwf", paymentObject);

  if (!description || !paymentObject || !amount || !expenseObject) {
    console.log(
      "Provide all details :",
      description,
      paymentObject,
      amount,
      expenseObject
    );
    return res.status(400).json({ message: "Provide All Details", data: null });
  }

  try {
    const newShare = new Share({
      description: description,
      amount: amount,
      paymentObject: paymentObject,
      expenseObject: expenseObject,
    });

    await newShare.save();
    const resultObject = {};
    for (const key in paymentObject) {
      // console.log(key, value);

      if (expenseObject.hasOwnProperty(key)) {
        resultObject[new mongoose.Types.ObjectId(key)] =
          paymentObject[key] - expenseObject[key];
      } else {
        resultObject[new mongoose.Types.ObjectId(key)] = paymentObject[key];
      }
    }
    console.log(resultObject);

    try {
      const newPayShareInd = new PayShareInd({
        resultObject,
        shareId: newShare._id,
      });
      console.log("New Share Individual", newPayShareInd);
      await newPayShareInd.save();
    } catch (error) {
      console.log("Error creating Individual pay share", error);
      return res
        .status(500)
        .json({ message: "Error creating Individual pay share", data: error });
    }

    return res.status(201).json({ message: "Shares Created", data: newShare });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating pay shares", data: error });
  }
};

export const settlePayShare = async (req, res) => {
  const { name } = req.user;

  try {
    const result = await PayShareInd.aggregate([
      {
        $project: {
          resultArray: {
            $objectToArray: "$resultObject",
          },
        },
      },
      {
        $unwind: "$resultArray",
      },
      {
        $group: {
          _id: "$resultArray.k",
          totalAmount: { $sum: "$resultArray.v" },
        },
      },
    ]);

    console.log(result);
    console.log(name);

    const resObject = {};
    let amount = 0;

    for (const res of result) {
      console.log("res", res);

      const user = await User.findById(res._id).select("username");
      resObject[user.username] = res.totalAmount;
      if (name === user.username) amount = res.totalAmount;
    }
    if (amount >= 0) console.log("You are at lead by ", amount);
    else console.log("You are trailing by", Math.abs(amount));

    return res
      .status(200)
      .json({ message: "Settled", username: name, totalAmount: amount });
  } catch (error) {
    console.log("Error settling share:", error);
    return res
      .status(500)
      .json({ message: "Error settling share", data: error });
  }
};

export const getPayShare = async (req, res) => {
  try {
    const payShares = await Share.find({
      paymentObject: { $exists: true, $ne: null },
    }).lean();

/*
    // Process each share to populate paymentObject
    for (const share of payShares) {
      let populatedPayShare = {};
      let populatedExpenseShare = {};

      for (const userId in share.paymentObject) {
        const user = await User.findById(userId).select("username").lean();

        if (user) {
          populatedPayShare[user.username] = share.paymentObject[userId];
        }
      }
      

      for (const userId in share.expenseObject) {
        const user = await User.findById(userId).select("username").lean();
        if (user) {
          populatedExpenseShare[user.username] = share.expenseObject[userId];
        }
      }

      // Replace the original paymentObject with the populated one

      share.paymentObject = populatedPayShare;
      share.expenseObject = populatedExpenseShare;
    }
*/

    // Step 1: Collect all userIds from both paymentObject and expenseObject
    let userIds = [];
    payShares.forEach((share) => {
      userIds.push(...Object.keys(share.paymentObject));
      userIds.push(...Object.keys(share.expenseObject));
    });

    console.log('before user ids', userIds);
    

    // Remove duplicates from userIds
    userIds = [...new Set(userIds)];

    console.log('after user ids', userIds);


    // Step 2: Fetch all users in one query
    const users = await User.find({ _id: { $in: userIds } })
      .select("username")
      .lean();

    

    // Step 3: Create a user map for easy lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user._id] = user.username;
    });

    console.log('usermap', userMap);
    

    // Step 4: Populate paymentObject and expenseObject in each share using the userMap
    payShares.forEach((share) => {
      const populatedPayShare = {};
      const populatedExpenseShare = {};

      // Populate paymentObject
      for (const userId in share.paymentObject) {
        const username = userMap[userId];
        if (username) {
          populatedPayShare[username] = share.paymentObject[userId];
        }
      }

      // Populate expenseObject
      for (const userId in share.expenseObject) {
        const username = userMap[userId];
        if (username) {
          populatedExpenseShare[username] = share.expenseObject[userId];
        }
      }

      // Replace the original objects with the populated ones
      share.paymentObject = populatedPayShare;
      share.expenseObject = populatedExpenseShare;
    });

    console.log("populatedPayShares", payShares);

    // Send the response back with the populated data
    res.status(200).json({ message: "Fetched pay shares", data: payShares });
  } catch (error) {
    console.error("Error populating pay shares:", error);
    res.status(500).json({ message: "Internal server error", data: error });
  }
};
