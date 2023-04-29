const express = require("express");
const { pool } = require("./database/data");
const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("O SERVIDOR ESTÁ ATIVO NA PORTA 8080");
})


// POST
app.post('/novoUsuario/:id/:name', async (req, res) =>{
    try {
        const client = await pool.connect();
        const { id, name } = req.params;
        const set = await client.query(`INSERT INTO Usuarios (id, nome) VALUES (${id}, '${name}')`);
        const { rows } = await client.query (`SELECT * FROM Usuarios`);
        console.table(rows);
        res.status(201).send(`NOVO USUÁRIO INSERIDO COM SUCESSO!`);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`ERRO DE CONEXÃO COM SERVIDOR!`);
    }
});

// PUT
app.put('/atualizarUsuario/:id/:name', async (req, res) =>{
    try {
        const client = await pool.connect();
        const { id, name } = req.params;
        const up = await client.query (`UPDATE Usuarios SET nome='${name}' WHERE id = '${id}'`);
        const { rows } = await client.query (`SELECT * FROM Usuarios`);
        console.table(rows);
        res.status(200).send(`USUÁRIO ATUALIZADO COM SUCESSO!`);
    } catch (error) {
        console.error(error);
        return res.status(400).send(`REQUISIÇÃO DE ATUALIZAÇÃO INVALIDADA!`);
    }
});

// DELETE
app.delete('/deletarUsuario/:id', async (req, res) =>{
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const del = await client.query(`DELETE FROM Usuarios WHERE id=${id}`);
        const { rows } = await client.query (`SELECT * FROM Usuarios`);
        console.table(rows);
        res.status(200).send(`USUÁRIO DELETADO COM SUCESSO!`);
    } catch (error) {
        console.error(error);
        res.status(400).send(`REQUISIÇÃO DE EXCLUSÃO INVALIDADA!`);
    }
});