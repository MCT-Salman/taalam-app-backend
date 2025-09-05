import prisma from "../prisma/client.js";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = async (req, res, next) => {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith("Bearer ")) return res.status(401).json({ error: "NO_TOKEN" });

  try {
    const token = hdr.slice(7);
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.currentSessionId || user.currentSessionId !== payload.sid) {
      return res.status(401).json({ error: "SESSION_REVOKED" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
};
