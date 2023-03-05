const express = require('express');

const rotas = express() //Rotas para o servidor


// Funcoes para respostas do recurso "professores"
const respostas = require('./controladores/funcoes-de-professores')

// Sem desestruturar as funções:
rotas.get('/professores', respostas.listaProfessores)
rotas.get('/professores/:id', respostas.buscarProfessor)
rotas.post('/professores', respostas.cadastroProfessor) //Adiciona um prof 'Post'
rotas.put('/professores/:id', respostas.atualizarCadastro) // Altera inf de Profs pelo id
rotas.patch('/professores/:id/status', respostas.modificarStatus) // Modifica uma parte (funciona sem o recurso 'status')
rotas.delete('/professores/:id', respostas.deletarProfessor) // Exclui



module.exports = rotas;