const userRoutes = require("./src/routes/userRoutes"); // como se fosse importação de biblioteca
require('dotenv').config()
const connectDB = require("./database");
const mongoose = require("mongoose"); // como se fosse importação de biblioteca
const express = require("express"); // como se fosse importação de biblioteca
const app = express(); // instanciando o app, uma propriedade que cria o servidor
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = 3000; //criando rota

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);


// Retorno da porta que o servidor está rodando
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// Home da API
app.get("/", (req, res) => {
  res.send("Pagina Inicial da API!");
})

// Rota Privada
app.get('/user/:id', checkToken, async(req, res) => {
  const user = await User.findById(id, '-password');
  if(!user){
    return res.status(404).json({msg: 'User not found'})
  }
  res.status(200).json(user);
})
//rota publica (MIddleware)
function checkToken(req, res, next){
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];
 if(!token){
   return res.status(401).json({msg: 'Acesso NEGADO'});
 }
  try{
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next()
  } catch(error){
    res.status(400).json({msg: 'Token INVÁLIDO'});
  }
}
// Pagina de registro dos usuários
app.post("/auth/register", async (req, res) =>{
  const {name, email, password} = req.body;
  // Validações do usuário
  if(!name) {
    return res.status(400).json({error: "Não digitou nenhum nome!"});
  }

  if(!email) {
    return res.status(400).json({error: "Não digitou nenhum email!"});
  }

  if(!senha) {
    return res.status(400).json({error: "Não digitou nenhuma senha!"});
  }
  //verificar se usuário existe
  const userExists = await User.findOne({email: email});
  if(userExists){
    return res.status(400).json({error: "O e-mail já existe!"});
  }
  //criptografar a senha
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);
  //criação de usuário
  const user = new User({
    name,
    email,
    password: passHash
  })
  try {
    await user.save();
    res.status(201).json("Usuário salvo! ");  
  } catch(error) {
    res.status(400).json({error: "Erro ao criar usuário!"});
  }
})

//rota de login
app.post("/auth/login", async (req, res) =>{
  const {email, password} = req.body;
  //validações
  if(!email) {
    return res.status(400).json({error: "Não digitou nenhum email!"});
  }

  if(!senha) {
    return res.status(400).json({error: "Não digitou nenhuma senha!"});
  }

  //verificar se usuário existe
  const user = await User.findOne({email: email});
  if(!user){
    return res.status(400).json({error: "usuario não encontrado"});
  }

  //verificar se a senha está correta
  const checkPass = await bcrypt.compare(password, user.password);
  if(!checkPass) {
    return res.status(400).json({error: "Senha incorreta!"});
  }

  try{
    const secret = process.env.SECRET
    const token = jwt.sign({id: user._id}, secret,);
    res.status(200).json({msg: 'Autenticação feita com sucesso!',token});
  } catch (err) {
    res.status(500).json({error: "Erro ao logar!"});
  }
})
        