import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    const savedGroup = await newGroup.save();

    if (!newGroup) {
      console.log("Cant create group", newGroup);
      return res.status(400).json(savedGroup);
    }

    console.log("Group created", newGroup);
    return res.status(201).json(newGroup);
  } catch (error) {
    console.log("Error creating group", error);
    return res.status(400).json(error);
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members");

    if (!groups.length) {
      console.log("no groups found", groups);
      return res.status(404).json(groups);
    }

    console.log("Groups: ", groups);
    return res.status(200).json(groups);
  } catch (error) {
    console.log("Error fetching group", error);
    return res.status(400).json(error);
  }
};

export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!groupId || !userId) {
      console.log("Id's not provided", groupId, userId);
      return res.status(404).json(groupId, userId);
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found with id ${userId}`);
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    const group = await Group.findById(groupId);

    if (group.members.includes(userId)) {
      console.log(`User already a member of group ${groupId}`);
      return res.status(400).json({
        success: false,
        message: "User is already a member",
        data: null,
      });
    }

    group.members.push(userId);
    await group.save();

    console.log("Member added to group");
    return res.status(200).json("Member added");
  } catch (error) {
    console.log("Error adding member to group ", error);
    return res.status(400).json(error);
  }
};

export const removeMemberFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    console.log(userId);
    if (!userId) {
      console.log("User id is not provided here", userId);
      return res.status(404).json(userId);
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found with id ${userId}`);
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      console.log(`Group not found with id ${groupId}`);
      return res
        .status(404)
        .json({ success: false, message: "Group not found", data: null });
    }

    group.members = group.members.filter(
      (member) => member.toString() !== userId
    );
    await group.save();

    console.log(`Removed user ${userId} from group ${groupId}`);
    return res
      .status(200)
      .json({
        success: true,
        message: "Member removed successfully",
        data: group,
      });
  } catch (error) {
    console.log(`Error removing user from group `);
    return res
      .status(200)
      .json({
        success: false,
        message: "Member remove unsuccessfull",
        data: error,
      });
  }
};
