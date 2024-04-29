const userRoutes = require("./src/routes/userRoutes"); // como se fosse importação de biblioteca
require('dotenv').config()
const connectDB = require("./database");
const mongoose = require("mongoose"); // como se fosse importação de biblioteca
const express = require("express"); // como se fosse importação de biblioteca
const app = express(); // instanciando o app, uma propriedade que cria o servidor
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const port = process.env.PORT; //criando rota

connectDB();

app.use(express.json());
app.use("/users", userRoutes);


// Retorno da porta que o servidor está rodando
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


