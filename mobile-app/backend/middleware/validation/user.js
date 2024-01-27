const { json } = require('express');
const { check, validationResult } = require('express-validator');

exports.validateUserSignup = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("name cannot be empty!")
        .withMessage("invalid name!")
        .isLength({ min: 5 })
        .withMessage("name must contain atleast 5 letters!"),
    check('mobile')
        .trim()
        .not()
        .isEmpty()
        .withMessage("mobile number cannot be empty!")
        .withMessage("invalid number!")
        .isLength({ min: 10, max:10 })
        .withMessage("number must contain 10 digits!"),
    check('email')
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage("email cannot be empty!")
        .isEmail()
        .withMessage("invalid email!"),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage("password cannot be empty!")
        .isLength({ min: 8, max: 20 })
        .withMessage("password must be within 8 to 20 characters long!")
    
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    
    const error = result[0].msg;
    res.json({
        success: false,
        message: error
    });
};

exports.validateUserSignIn = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('email/password is required!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('email/password is required!')
    
];

exports.validateUserReport = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("name cannot be empty!")
        .withMessage("invalid name!")
        .isLength({ min: 5 })
        .withMessage("name must contain atleast 5 letters!"),
    check('number')
        .trim()
        .not()
        .isEmpty()
        .withMessage("mobile number cannot be empty!")
        .withMessage("invalid number!")
        .isLength({ min: 10, max:10 })
        .withMessage("number must contain 10 digits!"),
    check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage("title cannot be empty!")
        .withMessage("invalid title!"),
    check('feedback')
        .trim()
        .not()
        .isEmpty()
        .withMessage("feedback cannot be empty!")
        .withMessage("invalid feedback!")
];