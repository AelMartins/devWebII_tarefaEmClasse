const express = require("express");
const { pool } = require("./database/data");
const app = express();
app.use(express.json());

app.listen(8080, () => {
    console.log("O SERVIDOR ESTÁ ATIVO NA PORTA 8080");
})


