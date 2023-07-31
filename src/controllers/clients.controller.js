export async function getClients(req, res) {
    try {
        const custumers = await db.query(`
        SELECT * FROM custumers;`);
        res.send(custumers.rows);
    } catch (err) {
        res.send(err);
    }

}

export async function getClientsById(req, res) {
    const {
        id
    } = req.params;
    const clientId = await db.query("SELECT * FROM customers WHERE id = $1", [id])
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
    const {
        id
    } = req.params;
    const {
        name,
        phone,
        cpf,
        birthday
    } = req.body;

    const cpfCustomer = await connection.query(`
    SELECT * FROM customers WHERE cpf = ($1);`, [cpf]);

    if (cpfCustomer.rows[0]) {

        res.sendStatus(409);
        return;
    }

    try {
        await db.query(`UPDATE customers
  SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
            [name, phone, cpf, birthday, id])
        res.sendStatus(200);
        return;
    } catch (err) {
        res.send(err);
    }
}