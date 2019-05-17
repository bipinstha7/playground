const jwt = require('jsonwebtoken')

module.exports = {
	validateToken: (req, res, next) => {
		const authorizationHeader = req.headers.authorization

		if (authorizationHeader) {
			// Bearer <token>
			const token = req.headers.authorization
			const options = {
				expiresIn: '2d',
				issuer: 'sthabipin.com.np',
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
				// throw new Error(err)
				res.status(401).send(err)
			}
		} else {
			res.status(401).send({
				error: 'Authorization Error. Token Required',
			})
		}
	},
}
