import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createShare, getShareById, getShares, settleShare } from "../controller/share.controller.js";

const router = new Router();

router.route("/create-share").post(verifyJWT, createShare);
router.route("/get-shares").get(verifyJWT, getShares);
router.route("/get-share/:shareId").get(verifyJWT, getShareById);
router.route('/settle-share').get(verifyJWT, settleShare)

export default router;