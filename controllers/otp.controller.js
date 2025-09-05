import { sendOtp, verifyOtp } from "../services/otp.service.js";

export const requestOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    await sendOtp(phone);
    res.json({ message: "OTP sent" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const checkOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    await verifyOtp(phone, code);
    res.json({ message: "OTP verified" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
