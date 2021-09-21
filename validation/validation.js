const validation = (req, res, next) => {
    var dados = { ...req.body }
    if (dados.nome === "" || dados.nome === undefined || dados.nome === null) {

        return res.json({ msg: "o campo nome é obrigatório" })

    } else if (dados.telefone === "" || dados.telefone === undefined || dados.telefone === null) {

        return res.json({ msg: "o campo telefone é obrigatório" })

    } else if (dados.email === "" || dados.email === undefined || dados.email === null) {

        return res.json({ msg: "o campo email é obrigatório" })

    } else if (dados.cep === "" || dados.cep === undefined || dados.cep === null) {

        return res.json({ msg: "o campo cep é obrigatório" })

    }else{
        next()
    }

}

module.exports = validation