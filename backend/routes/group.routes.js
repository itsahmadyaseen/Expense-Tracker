import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addMemberToGroup,
  createGroup,
  getGroups,
  removeMemberFromGroup,
} from "../controller/group.controller.js";

const router = Router();

router.route("/create-group").post(verifyJWT, createGroup);
router.route("/get-groups").get(verifyJWT, getGroups);
router.route("/add-member/:groupId").post(verifyJWT, addMemberToGroup);
router.route("/remove-member/:groupId").delete(verifyJWT, removeMemberFromGroup);

export default router;
