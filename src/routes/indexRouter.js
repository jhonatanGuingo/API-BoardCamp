import { Router } from "express";
import routerClients from "./router.clients.js";
import routerRent from "./router.rent.js";
import routerGames from "./router.games.js";

const router = Router();
router.use(routerClients);
router.use(routerRent);
router.use(routerGames);

export default router;