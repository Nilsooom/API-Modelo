
const bancodedados = require('../bancodedados')
const { professores } = bancodedados
let { identificadorUnico } = bancodedados
// exporta desestruturado o identificador que pode ser alterado


function listaProfessores(req, res) {
    res.json(professores)   //resposta em JSON
}

function buscarProfessor(req, res) {
    const { id } = req.params

    const buscador = professores.find((professor) => {
        return professor.id === Number(id)     //Localiza prof pelo ID
    })

    if (!buscador) {
        return res.status(404).json('Professor não encontraado ! Error 404')
    }
    res.json(buscador)
}

function cadastroProfessor(req, res) {
    const { nome, email, status } = req.body // desestrutura informações da requisição 'body'

    if (!nome) {
        return res.status(400).json('Nome é obrigatório!') // status = fornece o código de erro do servidor
    }
    if (!email) {
        return res.status(400).json('Email é obrigatório!')
    }

    // como propriedade tem o mesmo nome, poderia deixar somente a atribuição!
    const novoProfessor = {
        nome: nome,
        email: email,
        status: status ?? true, // "??" Se status for fornecido será atribuido, se não, 'true' será atribuido!
        id: identificadorUnico++ // após cadastro é somado
    }
    bancodedados.professores.push(novoProfessor)

    res.status(201).json(novoProfessor) //Status de  ok algo criado.
}

function atualizarCadastro(req, res) {
    const { id } = req.params;         //desestruturação das inf. passadas   
    const { nome, email, status } = req.body; //

    if (!nome) {
        return res.status(400).json('Nome é obrigatório') // validações se foram
    }                                                     //passado as inf obrigatorias   
    if (!email) {
        return res.status(400).json('Email é obrigatório')
    }

    const prof = professores.find((prof) => {
        return prof.id === Number(id)
    })

    if (!prof) {
        return res.status(404).json('Professsor não encontrado!')
    }

    prof.nome = nome;
    prof.email = email;
    prof.status = status;

    res.status(204).send() // Sem resposta apenas STATUS OK
}

function modificarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const prof = professores.find((prof) => {
        return prof.id === Number(id)
    })

    if (!prof) {
        return res.status(404).json('Professsor não encontrado!')
    } else {
        prof.status = status  // Não precisa do Else
    }

    res.status(203).send()
}

function deletarProfessor(req, res) {
    const { id } = req.params;

    const prof = professores.find((prof) => {
        return prof.id === Number(id)
    })

    if (!prof) {
        return res.status(404).json('Professsor não encontrado!')
    }

    professores.splice(professores.findIndex((prof) => {
        return prof.id === Number(id)
    }), 1)  // recorta do array pelo id

    res.status(203).send()
}

module.exports = {
    listaProfessores,
    buscarProfessor,
    cadastroProfessor,
    atualizarCadastro,
    modificarStatus,
    deletarProfessor
}