import prisma from "../prisma/client.js";

function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtp = async (phone) => {
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.otpCode.create({
    data: { phone, code, expiresAt }
  });

  console.log(`📩 OTP to ${phone}: ${code}`);
  return { success: true, message: "OTP sent" };
};

export const verifyOtp = async (phone, code) => {
  const otp = await prisma.otpCode.findFirst({
    where: { phone, code, used: false },
    orderBy: { createdAt: "desc" }
  });

  if (!otp) throw new Error("OTP غير صالح");
  if (otp.expiresAt < new Date()) throw new Error("انتهت صلاحية رمز OTP");

  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { used: true }
  });

  // إذا كان في مستخدم بهذا الرقم → فعل حسابه
  const user = await prisma.user.findUnique({ where: { phone } });
  if (user) {
    await prisma.user.update({
      where: { phone },
      data: { isVerified: true }
    });
  }

  return { success: true };
};
