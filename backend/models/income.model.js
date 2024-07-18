import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  date: { 
    type: Date, 
    default: Date.now },
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
