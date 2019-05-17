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
}
