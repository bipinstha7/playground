const users = require('./users')

// router as a dependency injection
module.exports = router => {
	users(router)
	return router
}
