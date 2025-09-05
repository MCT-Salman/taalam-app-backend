import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";

const r = Router();

r.get("/me", requireAuth, (req, res) => {
  res.json({
    message: "مرحباً بكم في ملفك الشخصي!",
    user: req.user
  });
});

export default r;
