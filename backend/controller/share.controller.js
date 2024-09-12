import mongoose from "mongoose";
import Share from "../models/share.model.js";
import shareIndividual from "../models/share_individual.model.js";
import User from "../models/user.model.js";

export const createShare = async (req, res) => {
  const { description, paidUserId, amount, expenseObject } = req.body;

  if (!description || !paidUserId || !amount || !expenseObject) {
    console.log(
      "Provide all details ",
      description,
      paidUserId,
      amount,
      expenseObject
    );
    return res.status(400).json({ message: "Provide All Details", data: null });
  }

  try {
    const newShare = new Share({
      description: description,
      paidUserId: paidUserId,
      amount: amount,
      expenseObject: expenseObject,
    });

    await newShare.save();

    for (const [key, value] of Object.entries(expenseObject)) {
      // console.log(key, value);
      if (key == paidUserId) continue;
      try {
        const newShareIndividual = new shareIndividual({
          debtorId: key,
          creditorId: paidUserId,
          amount: value,
          shareId: newShare.id,
        });
        console.log("New Share Individual", newShareIndividual);
        await newShareIndividual.save();
      } catch (error) {
        console.log("Error creating Individual share", error);
        return res
          .status(500)
          .json({ message: "Error creating Individual share", data: error });
      }
    }

    return res.status(201).json({ message: "Shares Created", data: newShare });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating shares", data: error });
  }
};

export const getShareById = async (req, res) => {
  // TODO apply lookup
  const { shareId } = req.params;
  //   console.log("Provide all details ", shareId);

  if (!shareId) {
    console.log("Provide shareId ", shareId);
    return res
      .status(400)
      .json({ message: "Provide All Details", data: shareId });
  }
  try {
    const shareDetails = await Share.findById(shareId);
    console.log("share details:", shareDetails);

    const individualShareDetails = await shareIndividual.find({
      shareId: shareId,
    });

    console.log("Individual Share Details:", individualShareDetails);

    return res.status(200).json({
      message: "Share details fetched",
      data: shareDetails,
    });
  } catch (error) {
    console.log("Error fetching share details", error);
    return res.status(500).json({
      message: "Error fetching share details",
      data: error,
    });
  }
};

//This is not for final share
export const getShares = async (req, res) => {
  try {
    const shares = await Share.find().populate("paidUserId", "username").lean(); // if the keys are in strings | lean -  converts the mongoose doc to plain js object

    //if the keys are stored as ObjectId in the database .populate({
    //   path: "expenseObject",
    //   populate: {
    //     path: "userId", // if the keys are stored as ObjectId in the database
    //     model: "User",
    //     select: "username",
    //   },

    for (let share of shares) {
      const populatedExpenseObject = {};
      for (let userId in share.expenseObject) {
        const user = await User.findById(userId).select("username").lean();
        if (user) {
          populatedExpenseObject[user.username] = share.expenseObject[userId]; 
          //Assigns the username from the User document as a key in populatedExpenseObject.      
          // The value is the amount that was originally stored under the userId key in expenseObject.
        }
      }
      share.expenseObject = populatedExpenseObject; // replace with new one
      console.log("populatedExpenseObject", populatedExpenseObject);
    }

    if (!shares) {
      console.log("Cannot find shares :", shares);
      return res
        .status(404)
        .json({ message: "Cannot find shares :", data: shares });
    }

    console.log("Shares fetched :", shares);
    return res.status(200).json({ message: "Shares fetched :", data: shares });
  } catch (error) {
    console.log("Error fetching shares :", error);
    return res
      .status(200)
      .json({ message: "Error fetching shares", data: error });
  }
};

export const settleShare = async (req, res) => {
  const myId = req.user.id;

  if (!myId) {
    console.log("Provide id ", id);
    return res.status(400).json({ message: "Provide All Details", data: id });
  }

  try {
    const userDetails = await User.find().select("_id");
    //   console.log(userDetails);

    const userIds = userDetails
      .filter((user) => user.id !== myId)
      .map((user) => user.id);

    console.log("user ids : ", userIds);

    const responseArray = [];

    // for (const debUserId of userIds) {
    //   // console.log(debUserId);

    for (const credUserId of userIds) {
      // if (credUserId === debUserId) {
      //   console.log("Match");
      //   continue;
      // }
      // console.log("debUserId :", debUserId);
      // console.log("credUserId :", credUserId);

      // console.log("Matching Criteria:", {
      //   debtorId: debUserId,
      //   creditorId: credUserId,
      // });

      const debObjectId = new mongoose.Types.ObjectId(myId);
      const credObjectId = new mongoose.Types.ObjectId(credUserId);

      const shareDetails = await shareIndividual.aggregate([
        {
          $match: {
            debtorId: debObjectId,
            creditorId: credObjectId,
          },
        },
        {
          $group: {
            _id: null,
            total_amount: { $sum: "$amount" },
          },
        },
      ]);
      const totalAmount =
        shareDetails.length > 0 ? shareDetails[0].total_amount : 0;

      if (totalAmount === 0) continue;

      const debUser = await User.findById(myId).select("username");
      const credUser = await User.findById(credUserId).select("username");
      const responseObject = {};

      Object.assign(responseObject, {
        debUser: debUser.username,
        credUser: credUser.username,
        amount: totalAmount,
      });
      // console.log(responseObject);
      responseArray.push(responseObject);
      // console.log("share individual details:", shareDetails);

      console.log("total:", totalAmount);
    }

    for (const debUserId of userIds) {
      // if (credUserId === debUserId) {
      //   console.log("Match");
      //   continue;
      // }
      // console.log("debUserId :", debUserId);
      // console.log("credUserId :", credUserId);

      // console.log("Matching Criteria:", {
      //   debtorId: debUserId,
      //   creditorId: credUserId,
      // });

      // const debObjectId = new mongoose.Types.ObjectId(debUserId);
      // const credObjectId = new mongoose.Types.ObjectId(myId);

      const shareDetails = await shareIndividual.aggregate([
        {
          $match: {
            debtorId: debUserId,
            creditorId: myId,
          },
        },
        {
          $group: {
            _id: null,
            total_amount: { $sum: "$amount" },
          },
        },
      ]);
      const totalAmount =
        shareDetails.length > 0 ? shareDetails[0].total_amount : 0;

      if (totalAmount === 0) continue;
      const debUser = await User.findById(debUserId).select("username");
      const credUser = await User.findById(myId).select("username");
      const responseObject = {};

      Object.assign(responseObject, {
        debUser: debUser.username,
        credUser: credUser.username,
        amount: totalAmount,
      });
      // console.log(responseObject);
      responseArray.push(responseObject);
      // console.log("share individual details:", shareDetails);

      console.log("total:", totalAmount);
    }

    console.log("Last Response", responseArray);
    return res
      .status(200)
      .json({ message: "Amount settled : ", data: responseArray });
  } catch (error) {
    console.log("Error settling amount", error);
    return res
      .status(200)
      .json({ message: "Error settling amount :", data: error });
  }
};
