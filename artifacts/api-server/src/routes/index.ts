import { Router, type IRouter } from "express";
import healthRouter from "./health";
import rssRouter from "./rss";
import modsRouter from "./mods";
import adminAuthRouter from "./admin-auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(rssRouter);
router.use(modsRouter);
router.use(adminAuthRouter);

export default router;
