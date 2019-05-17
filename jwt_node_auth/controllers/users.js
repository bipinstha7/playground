const bcrypt = require('bcrypt')
const User = require('../models/users')

module.exports = {
	add: (req, res) => {
		const { name, password } = req.body
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
								res.status(200).send(user.name)
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
}
