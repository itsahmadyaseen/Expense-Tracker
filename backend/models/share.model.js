import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    paidUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentObject: {
      type: mongoose.Schema.Types.Mixed,
    }, 
    expenseObject: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const Share = mongoose.model("Share", shareSchema);

export default Share;
