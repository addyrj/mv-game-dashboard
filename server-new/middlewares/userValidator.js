const { body, validationResult } = require('express-validator');
const { httpStatusCodes } = require('../helper/helper');

const validateErrors = function (req, res, next) {
   /**
    * validate the request
    */
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         error: errors.array(),
         status: httpStatusCodes.INVALID_INPUT,
      });
   }

   next();
};

exports.userValidator = [
   body('email', 'please enter valid email')
      .isEmail()
      .trim()
      .isLength({ min: 5 })
      .normalizeEmail(),

   body('password', 'password length minimum 5')
      .not()
      .isEmail()
      .withMessage('Password is not empty')
      .isLength({ min: 5 }),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

exports.usernameUpdateValidator = [
   body('userName')
      .not()
      .isEmail()
      .withMessage('user name is required!')
      .isLength({ min: 4 })
      .withMessage('user name almost 4 characters long'),

   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

exports.userEmailValidator = [
   body('email').isEmail().trim().isLength({ min: 5 }).normalizeEmail(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

exports.userPasswordValidator = [
   body('password', 'password length minimum 5')
      .not()
      .isEmail()
      .withMessage('Password is not empty')
      .isLength({ min: 5 }),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];
