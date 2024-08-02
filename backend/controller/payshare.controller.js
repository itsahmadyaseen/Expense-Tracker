import PayShareInd from "../models/payshareInd.model.js";
import Share from "../models/share.model.js";
import User from "../models/user.model.js";

export const createShare = async (req, res) => {
  const { description, amount, paymentObject, expenseObject } = req.body;

  if (!description || !paymentObject || !amount || !expenseObject) {
    console.log(
      "Provide all details ",
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

    //   await newShare.save();
    const resultObject = {};
    for (const key in paymentObject) {
      // console.log(key, value);

      if (expenseObject.hasOwnProperty(key)) {
        resultObject[key] = paymentObject[key] - expenseObject[key];
      } else {
        resultObject[key] = paymentObject[key];
      }
    }

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
