import prisma from "../prisma/client.js";
import { hashPassword } from "../utils/hash.js";

export const createSubAdmin = async (phone, password, name, birthDate) => {
  const exists = await prisma.user.findUnique({ where: { phone } });
  if (exists) throw new Error("رقم الهاتف موجود مسبقا");

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      phone,
      passwordHash,
      name,
      birthDate: new Date(birthDate),
      role: "SUBADMIN",
      isVerified: true
    }
  });

  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
};

export const setUserRole = async (userId, role) => {
  const validRoles = ["STUDENT", "ADMIN", "SUBADMIN"];
  if (!validRoles.includes(role)) throw new Error("هذا الدور غير فعال");

  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      phone: true,
      name: true,
      role: true,
      isActive: true
    }
  });
};

export const toggleUserActive = async (userId, isActive) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isActive },
    select: {
      id: true,
      phone: true,
      name: true,
      role: true,
      isActive: true
    }
  });
};
