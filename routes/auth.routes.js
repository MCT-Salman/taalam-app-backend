import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { uploadAvatar } from "../utils/upload.js";

const r = Router();

// نستخدم upload.single لرفع صورة باسم avatar
r.post("/register", uploadAvatar.single("avatar"), register);
r.post("/login", login);

export default r;
