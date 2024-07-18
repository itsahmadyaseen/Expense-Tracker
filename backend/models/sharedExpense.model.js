import mongoose from "mongoose";

const sharedExpenseSchema = new mongoose.Schema({
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
    default: Date.now,
  },

  group:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Group'
  }
});

const SharedExpense = new mongoose.model('SharedExpense', sharedExpenseSchema)

export default SharedExpense;