const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser")

const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//criando conexão com o bando
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'db_alunos'
})

//conectar ao bando
db.connect((err) => {
    if (err)
        throw err.sqlMessage;
    console.log('Conectado ao Banco de Dados MySQL');
});

//pagina inicial
server.get('/', (req, res) => {
    console.log('servidor funcionando');
    return res.render("index")
})
server.get('/inicio', (req, res) => {
    return res.render("index")
})

//pagina sobre
server.get('/about', (req, res) => {
    return res.render("about")
})

//pagina contato
server.get('/contato', (req, res) => {
    return res.render("contato")
})


//estudante

//turma
server.get('/estudante/turma', function (req, res) {
    db.query('SELECT * FROM tb_cadastro', function (err, rows) {
        res.render('estudante/turma', { cadastro: rows })
    })
})

//cadastrar
server.get('/estudante/cadastrar', function (req, res) {
    res.render('estudante/cadastrar', { cadastro: {} })
})

server.post('/estudante/cadastrar', function (req, res) {

    db.query('INSERT tb_cadastro SET ?', req.body, function (err, rows, fields) {
        if (!err)
            res.redirect('/estudante/turma')
        else
            res.status(400).json(err);
    })
})

//excluir aluno
server.get('/excluirCadastro', function (req, res) {
    db.query('DELETE FROM tb_cadastro WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.redirect('/estudante/turma')
        else
            res.status(400).json(err);
    })
})

//atualizar aluno
server.get('/atualizarCadastro', function (req, res) {
    db.query('SELECT * FROM tb_cadastro WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.render('estudante/cadastrar', { cadastro: rows[0] })
        else
            res.status(400).json(err);
    })
})

server.post('/atualizarCadastro', function (req, res) {
    var param
    db.query('UPDATE tb_cadastro SET ? WHERE id = ?', [req.body, req.query.id], function (err, rows, fields) {
        if (!err)
            res.redirect('estudante/turma')
        else
            res.status(400).json(err);
    })
})

//professor
//lista
server.get('/professor/lista', function (req, res) {
    db.query('SELECT * FROM tb_cadprof', function (err, rows) {
        res.render('professor/lista_prof', { cadprof: rows })
    })
})


//cadastrar professor
server.get('/professor/cadastrar', function (req, res) {
    res.render('professor/cadastrar_prof', { cadprof: {} })
})

server.post('/professor/cadastrar', function (req, res) {

    db.query('INSERT tb_cadprof SET ?', req.body, function (err, rows, fields) {
        if (!err)
            res.redirect('/professor/lista')
        else
            res.status(400).json(err);
    })
})


//excluir professor
server.get('/excluirCadastroProf', function (req, res) {
    db.query('DELETE FROM tb_cadprof WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.redirect('/professor/lista')
        else
            res.status(400).json(err);
    })
})

//atualizar professor
server.get('/atualizarCadastroProf', function (req, res) {
    db.query('SELECT * FROM tb_cadprof WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.render('professor/cadastrar_prof', { cadprof: rows[0] })
        else
            res.status(400).json(err);
    })
})

server.post('/atualizarCadastroProf', function (req, res) {
    var param
    db.query('UPDATE tb_cadprof SET ? WHERE id = ?', [req.body, req.query.id], function (err, rows, fields) {
        if (!err)
            res.redirect('professor/lista')
        else
            res.status(400).json(err);
    })
})

//Porta do servidor
server.listen(4000, function () {
    console.log('Servidor em execução...')
})