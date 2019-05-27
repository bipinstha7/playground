const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = {
	add: (req, res) => {
		const { name, password } = req.body

		// Actually we need to validate the data before saving in database
		const user = new User({ name, password })

		user.save()
			.then(user => {
				res.status(201).send(user.name)
			})
			.catch(err => res.status(500).send(err))
	},
	login: (req, res) => {
		const { name, password } = req.body

		User.findOne({ name })
			.then(user => {
				if (user) {
					bcrypt
						.compare(password, user.password)
						.then(match => {
							if (match) {
								// create a token with expiration
								const payload = { user: user.name }
								const options = {
									expiresIn: '2d',
								}
								const secret = process.env.JWT_SECRET
								const token = jwt.sign(payload, secret, options)

								res.status(200).send({
									name: user.name,
									token,
								})
							} else {
								res.status(401).json('Authentication Error')
							}
						})
						.catch(err => res.status(500).josn(err))
				} else {
					res.status(404).json('User Not Found')
				}
			})
			.catch(err => res.status(500).json(err))
	},
	getAll: (req, res) => {
		const payload = req.decoded

		if (payload && payload.user === 'admin') {
			User.find({})
				.select('-password')
				.then(users => res.status(200).send(users))
				.catch(err => res.status(500).send(err))
		} else {
			res.status(401).send({
				error: 'Authorization Error',
			})
		}
	},
}
