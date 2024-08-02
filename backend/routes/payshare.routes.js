import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createShare, settlePayShare } from "../controller/payshare.controller.js";



const router = Router();

router.route("/create-pay-share").post(verifyJWT, createShare);
router.route("/settle-pay-share").post(verifyJWT, settlePayShare);

export default router;
