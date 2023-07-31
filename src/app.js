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

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})