const express = require('express')
const router = express.Router()
var db = require('../database/database')
var validation = require('../validation/validation')


router.get('/',db.listar)
router.get('/:id',db.pesquisar)
router.post('/',validation,db.salvar)
router.put('/:id',validation,db.editar)
router.delete('/',db.excluir)



module.exports = router;
