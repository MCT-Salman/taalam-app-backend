import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getProfile, updateProfile, updateAvatar } from "../controllers/user.controller.js";
import { uploadAvatar } from "../utils/upload.js";

const r = Router();

r.get("/me", requireAuth, getProfile);
r.put("/update", requireAuth, updateProfile);
r.put("/avatar", requireAuth, uploadAvatar.single("avatar"), updateAvatar);

export default r;
