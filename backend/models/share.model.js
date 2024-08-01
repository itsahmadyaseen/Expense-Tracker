import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    paidUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
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
