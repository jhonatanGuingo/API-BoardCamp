import { db } from "../database/database.js";


export async function getGames(req,res) {
    try {
      const games = await db.query(`
      SELECT * FROM games;`);
      res.send(games.rows);
    }
    
    catch (err) {
      res.send(err);
    }
  }
  
  export async function postGames(req,res) {
  
    const { name, image, stockTotal, pricePerDay } = req.body;

    const nameGame = await db.query(`
      SELECT * FROM games WHERE name = ($1);`, [name]);
  
    if (nameGame.rows[0]){
      
      res.sendStatus(409);
      return;
    }
  
  
    try {
    await db.query(`
      INSERT INTO games 
        (name, image, "stockTotal", "pricePerDay") 
      VALUES ($1,$2,$3,$4);`, 
        [name, image, stockTotal,pricePerDay]
      )
      res.sendStatus(201);
      return;
  
    }
    catch (err) {
      console.log(err)
    }
  }