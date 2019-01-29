const User = require('./models/user')
const { body } = require('express-validator/check')

exports.validate = method => {
	switch (method) {
		case 'createUser': {
			return [
				body('userName', "userName doesn't exists").exists(),
				body('email', 'Invalid email')
					.exists()
					.isEmail(),
				body('phone')
					.optional()
					.isInt(),
				body('status')
					.optional()
					.isIn(['enabled', 'disabled'])
			]
		}
	}
}

const validationHandler = next => result => {
	if (result.isEmpty()) return

	if (!next) {
		throw new Error(result.array.map(i => `'${i.param}' has ${i.msg}`).join(' '))
	} else {
		return next(result.array.map(i => `'${i.param}' has ${i.msg}`).join(' '))
	}
}

exports.createUser = (req, res, next) => {
	req.getValidationResult() // to get the result of above validate fn
		.then(validationHandler())
		.then(() => {
			const { userName, email, phone, status } = req.body

			User.create({
				userName,
				email,
				phone,
				status
			})
				.then(user => res.josn(user))
				.cath(next)
		})
		.catch(next)
}
