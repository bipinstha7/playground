const express = require('express')
const router = express.Router()

/* Generic route handler */
const gerericHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    })
}

/* create a new teacher or student */
router.post('/people', gerericHandler)

/* change auth creadentials for teachers */
router.post('/auth/edit', gerericHandler)

/* accept fee payments for students */
router.post('/fees/pay', gerericHandler)

module.exports = router