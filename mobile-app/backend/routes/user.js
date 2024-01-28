const express = require('express');
const { createUser, userSignInPublic, userSignInCollector, reportUser } = require('../controllers/user');
const { validateUserSignup, userValidation, validateUserSignIn, validateUserReport } = require('../middleware/validation/user');

const router = express.Router();

router.post('/create-user', validateUserSignup, userValidation, createUser);
router.post('/sign-in-public', validateUserSignIn, userValidation, userSignInPublic);
router.post('/sign-in-collector', validateUserSignIn, userValidation, userSignInCollector);
router.post('/report-user', validateUserReport, userValidation, reportUser);





module.exports = router;