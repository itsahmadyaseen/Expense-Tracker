import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
