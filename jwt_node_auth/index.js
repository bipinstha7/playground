require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes/index')

const app = express()
const router = express.Router()

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]
const db = process.env.MONGO_URI

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log({ Error: err }))

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
