import {
  deleteUser,
  getProfile,
  getUsers,
  loginUser,
  logoutUser,
  signupUser,
} from "../controller/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/logout").post(logoutUser);
router.route("/get-users").get(getUsers);
router.route("/profile").get( verifyJWT ,getProfile);

export default router;
