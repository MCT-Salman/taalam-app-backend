import { Router } from "express";
import { requestOtp, checkOtp } from "../controllers/otp.controller.js";

const r = Router();

r.post("/request", requestOtp); // إرسال OTP
r.post("/verify", checkOtp);    // التحقق من OTP

export default r;
