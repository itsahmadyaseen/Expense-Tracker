import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createShare, getPayShare, settlePayShare } from "../controller/payshare.controller.js";



const router = Router();

router.route("/create-pay-share").post(verifyJWT, createShare);
router.route("/settle-pay-share").post(verifyJWT, settlePayShare);
router.route("/get-pay-shares").get(verifyJWT, getPayShare);

export default router;
