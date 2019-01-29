const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

const router = express.Router()

app.use(bodyParser.json())
app.use(expressValidator())
app.use('/api', router)

