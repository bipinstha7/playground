require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const routes = require('./routes/index')

const app = express()
const router = express.Router()

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (environment !== 'production') {
	app.use(logger('dev'))
}

app.use('/api/v1', routes(router))

app.listen(`${stage.port}`, () => {
	console.log(`Server is running on port: ${stage.port}`)
})

module.exprots = app
