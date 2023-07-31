import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}
export const db = new Pool(configDatabase)
async function testarConexao() {
    try {
      // Realiza uma consulta simples ao banco de dados (por exemplo, selecionando a versão do PostgreSQL)
      const resultado = await db.query('SELECT version()');
  
      // Se a consulta foi bem-sucedida, a conexão está funcionando
      console.log('Conexão bem-sucedida!');
      console.log('Versão do PostgreSQL:', resultado.rows[0].version);
    } catch (err) {
      // Se ocorrer um erro, a conexão não foi bem-sucedida
      console.error('Erro ao conectar ao PostgreSQL:', err);
    } 
  }
  
  // Chama a função para verificar a conexão
  testarConexao();

