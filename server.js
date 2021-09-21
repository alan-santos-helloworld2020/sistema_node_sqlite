const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const router = require('./router/router')
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)



app.listen(port, () => console.log(`http://localhost:${port}`))

