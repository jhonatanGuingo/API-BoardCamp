import {Router} from "express";
import { getClients, getClientsById, insertClient, updateClientById } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/validate.js";
import { clientSchema } from "../schemas/client.schema.js";

const routerClients = Router();

routerClients.get('/customers', getClients);
routerClients.get('/customers/:id', getClientsById);
routerClients.post('/customers',validateSchema(clientSchema), insertClient);
routerClients.put('/customers/:id',validateSchema(clientSchema), updateClientById);

export default routerClients;