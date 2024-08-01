import mongoose from "mongoose";

const shareIndividualSchema = new mongoose.Schema(
  {
    debtorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creditorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    shareId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Share",
    },
  },
  { timestamps: true }
);

const shareIndividual = mongoose.model(
  "shareIndividual",
  shareIndividualSchema
);

export default shareIndividual;
