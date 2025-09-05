import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { phone, password, name, birthDate } = req.body;
    const avatarUrl = req.file ? `/uploads/avatars/${req.file.filename}` : null;

    const user = await registerUser(phone, password, name, birthDate, avatarUrl);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const ua = req.headers["user-agent"];
    const ip = req.ip;
    const result = await loginUser(phone, password, ua, ip);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};
