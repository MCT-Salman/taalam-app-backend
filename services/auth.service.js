import prisma from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (phone, password, name, birthDate, avatarUrl) => {
  const exists = await prisma.user.findUnique({ where: { phone } });
  if (exists) throw new Error("PHONE_TAKEN");

  // نتأكد أن الرقم تم التحقق منه قبل التسجيل
  const otp = await prisma.otpCode.findFirst({
    where: { phone, used: true },
    orderBy: { createdAt: "desc" }
  });
  if (!otp) throw new Error("لم يتم التحقق من الهاتف");

  if (!name || !birthDate || !password) {
    throw new Error("الحقول المطلوبة المفقودة");
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      phone,
      passwordHash,
      name,
      birthDate: new Date(birthDate),
      avatarUrl: avatarUrl || null,
      isVerified: true
    }
  });

  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
};

export const loginUser = async (phone, password, ua, ip) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user) throw new Error("رقم الهاتف أو كلمة المرور خاطئة");
  if (!user.isVerified) throw new Error("لم يتم التحقق من الهاتف");

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw new Error("رقم الهاتف أو كلمة المرور خاطئة");

  const session = await prisma.session.create({
    data: { userId: user.id, userAgent: ua, ip }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { currentSessionId: session.id }
  });

  const token = generateToken({
    id: user.id,
    sid: session.id,
    role: user.role
  });

  const { passwordHash: _, ...safeUser } = user;
  return { token, user: safeUser };
};
