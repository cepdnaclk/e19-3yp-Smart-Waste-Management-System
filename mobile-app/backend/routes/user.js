const express = require('express');
const { createUser, userSignIn } = require('../controllers/user');
const { validateUserSignup, userValidation, validateUserSignIn } = require('../middleware/validation/user');

const router = express.Router();

router.post('/create-user', validateUserSignup, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);


module.exports = router;