import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";

const r = Router();

r.get("/me", requireAuth, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user
  });
});

export default r;
