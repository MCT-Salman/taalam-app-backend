import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        phone: true,
        name: true,
        birthDate: true,
        avatarUrl: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, birthDate, password, newPassword } = req.body;

    // إذا كان المستخدم بده يغير كلمة المرور
    if (password && newPassword) {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) throw new Error("INVALID_PASSWORD");

      const newHash = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: req.user.id },
        data: { passwordHash: newHash }
      });
    }

    // تحديث الاسم وتاريخ الميلاد
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || undefined,
        birthDate: birthDate ? new Date(birthDate) : undefined
      },
      select: {
        id: true,
        phone: true,
        name: true,
        birthDate: true,
        avatarUrl: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) throw new Error("NO_FILE");

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { avatarUrl },
      select: {
        id: true,
        phone: true,
        name: true,
        birthDate: true,
        avatarUrl: true,
        role: true,
        isVerified: true
      }
    });

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
