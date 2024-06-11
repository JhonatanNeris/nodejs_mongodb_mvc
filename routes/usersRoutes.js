const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/signin', UserController.signin)
router.post('/signin', UserController.signinPost)
router.get('/register', UserController.signup)
router.post('/register', UserController.signupPost)
router.get('/signout', UserController.signout)

module.exports = router