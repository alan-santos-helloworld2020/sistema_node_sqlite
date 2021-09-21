const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./database/onload.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS clientes(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       data TEXT NOT NULL, 
       nome TEXT NOT NULL, 
       telefone TEXT NOT NULL, 
       email TEXT UNIQUE NOT NULL, 
       cep TEXT NOT NULL 

    );`)
})

module.exports = {

    listar: (req, res) => {
        db.all('SELECT * FROM clientes', (err, rows) => {
            if (err) console.log(`Erro: ${err}`);
            res.json(rows)
        })
    },

    pesquisar: (req, res) => {
        var id = req.params.id
        db.get('SELECT * FROM clientes WHERE id=?', [id], (err, rows) => {
            if (err) console.log(`Erro: ${err}`);
            res.json(rows)
        })
    },

    salvar: (req, res) => {
        var dados = { ...req.body }
        dados.data = new Date().toLocaleDateString()
        db.run('INSERT INTO clientes(data,nome,telefone,email,cep)VALUES(?,?,?,?,?);', [dados.data, dados.nome, dados.telefone, dados.email, dados.cep], (err) => {
            if (err) {
                res.status(500).json({ Erro: err.message });
            } else {

                res.json({ msg: true })
            }

        })
    },

    editar: (req, res) => {
        var id = req.params.id
        var dados = { ...req.body }
        db.run('UPDATE clientes SET nome=?,telefone=?,email=?,cep=? WHERE id=?', [dados.nome, dados.telefone, dados.email, dados.cep, id], (err) => {
            if (err) {
                res.json(`Erro: ${err.message}`)
            } else {

                res.json({ msg: true })
            }

        })
    },

    excluir: (req, res) => {
        var id = req.params.id
        db.run('DELETE FROM clientes WHERE id=?;', [id], (err) => {
            if (err) console.error(`Erro: ${err.message}`);
            res.json({ msg: true })

        })
    }

}

