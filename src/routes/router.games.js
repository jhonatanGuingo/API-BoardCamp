import {Router} from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validate.js";
import { postGameSchema } from "../schemas/games.schema.js";

const routerGames = Router();
routerGames.get('/games', getGames);
routerGames.post('/games', validateSchema(postGameSchema), postGames)
export default routerGames;