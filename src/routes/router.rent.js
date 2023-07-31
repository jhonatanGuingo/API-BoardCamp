import {Router} from "express";
import { deleteRent, finishRent, getRentals, insertRent } from "../controllers/rent.controller.js";

const routerRent = Router();

routerRent.get('/rentals', getRentals);
routerRent.post('/rentals', insertRent);
routerRent.post('/rentals/:id/return', finishRent);
routerRent.delete('/rentals/:id', deleteRent);

export default routerRent;