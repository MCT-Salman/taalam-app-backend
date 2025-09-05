// هذا الملف فقط للتوضيح كيف نتعامل مع المستخدم عبر Prisma
import prisma from "../prisma/client.js";

export const findUserByPhone = (phone) => {
  return prisma.user.findUnique({ where: { phone } });
};

export const createUser = (data) => {
  return prisma.user.create({ data });
};
