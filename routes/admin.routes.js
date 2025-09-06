// import { Router } from "express";
// import { requireAuth } from "../middlewares/auth.middleware.js";
// import { requireRole } from "../middlewares/role.middleware.js";

// const r = Router();

// r.get("/dashboard", requireAuth, requireRole(["ADMIN", "SUBADMIN"]), (req, res) => {
//   res.json({ message: "Welcome Admin Panel", user: req.user });
// });

// r.get("/only-admin", requireAuth, requireRole(["ADMIN"]), (req, res) => {
//   res.json({ message: "This is for MAIN ADMIN only", user: req.user });
// });

// export default r;

import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { addSubAdmin, changeRole, deactivateUser } from "../controllers/admin.controller.js";

const r = Router();

// كل المسارات هنا للمدير الرئيسي فقط
r.post("/create-subadmin", requireAuth, requireRole(["ADMIN"]), addSubAdmin);
r.put("/set-role", requireAuth, requireRole(["ADMIN"]), changeRole);
r.put("/toggle-active", requireAuth, requireRole(["ADMIN"]), deactivateUser);

export default r;
