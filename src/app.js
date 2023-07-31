import dotenv from "dotenv"
import cors from 'cors';
import express from 'express';
import { db } from "./database/database.js";
import router from "./routes/indexRouter.js";
import routerGames from "./routes/router.games.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})