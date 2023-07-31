import {
    db
} from "../database/database.js";

export async function getClients(req, res) {
    try {
        const customers = await db.query(`
        SELECT 
        id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday 
        FROM customers;`);
        res.send(customers.rows);
    } catch (err) {
        res.send(err);
    }

}

export async function getClientsById(req, res) {
    const {
        id
    } = req.params;
    const clientId = await db.query(`
        SELECT 
        id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday 
        FROM customers;`);
    if (!clientId.rows[0]) {
        res.sendStatus(404);
        return
    }
    res.send(clientId.rows[0])
}

export async function insertClient(req, res) {
    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;
    const cpfClient = await db.query(`
        SELECT * FROM customers WHERE cpf = ($1);
    `, [cpf])
    if (cpfClient.rows[0]) {
        res.sendStatus(409);
        return;
    }

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
        return
    } catch (err) {
        res.send(err);
    }
}

export async function updateClientById(req, res) {

    try {
        const {
            id
        } = req.params;
        const {
            name,
            phone,
            cpf,
            birthday
        } = req.body;

        const cpfCustomer = await db.query(`
        SELECT * FROM customers WHERE cpf = ($1);`, [cpf]);
        const cpfbyId = await db.query(`SELECT cpf FROM customers WHERE id = $1;`, [id])
        if (cpfCustomer.rows[0] && cpfbyId.rows[0].cpf !== cpf) {

            res.sendStatus(409);
            return;
        }

        await db.query(`UPDATE customers
  SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
            [name, phone, cpf, birthday, id])
        res.sendStatus(200);
        return;
    } catch (err) {
        res.send(err);
    }
}