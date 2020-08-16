const express = require('express');
const router = express.Router();
const {signInUser, signUpUser} = require('../services/user/userController') 

router.post('/signup', signUpUser);
router.post('/signin', signInUser)

module.exports = router;
