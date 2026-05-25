import { Router, type IRouter } from "express";

const router: IRouter = Router();

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getIp(req: any): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
}

router.post("/admin/verify", (req, res) => {
  const ip = getIp(req);
  const now = Date.now();

  const record = attempts.get(ip);
  if (record) {
    if (now > record.resetAt) {
      attempts.delete(ip);
    } else if (record.count >= MAX_ATTEMPTS) {
      const wait = Math.ceil((record.resetAt - now) / 1000 / 60);
      return res.status(429).json({ success: false, message: `Too many attempts. Try again in ${wait} min.` });
    }
  }

  const { password } = req.body as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(503).json({ success: false, message: "Admin not configured." });
  }

  if (!password || password !== expected) {
    const cur = attempts.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };
    cur.count++;
    attempts.set(ip, cur);
    return res.status(401).json({ success: false, message: "Incorrect password." });
  }

  attempts.delete(ip);
  return res.json({ success: true });
});

export default router;
