const express = require('express');
const app = express();

const rotas = require('./rotas')
const senha = require('./intermediarios')


app.use(express.json()) //Metodo do JASON dentro do express
app.use(senha)         //Mildiware de validação de senha
app.use(rotas)       //lendo rotas como midiwire





app.listen(3000)