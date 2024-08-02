import mongoose from "mongoose";

const payshareIndSchema = new mongoose.Schema(
  {
    resultObject: {
      type: mongoose.Schema.Types.Mixed,
    },
    shareId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Share",
    },
  },
  { timestamps: true }
);

const PayShareInd = mongoose.model("PayShareInd", payshareIndSchema);

export default PayShareInd;
