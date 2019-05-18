const jwt = require('jsonwebtoken')

module.exports = {
	validateToken: (req, res, next) => {
		const authorizationHeader = req.headers.authorization

		if (authorizationHeader) {
			const token = req.header('authorization')
			const options = {
				expiresIn: '2d',
			}

			try {
				const result = jwt.verify(
					token,
					process.env.JWT_SECRET,
					options
				)

				req.decoded = result

				next()
			} catch (err) {
				res.status(401).send(err)
			}
		} else {
			res.status(401).send({
				error: 'Authorization Error. Token Required',
			})
		}
	},
}
