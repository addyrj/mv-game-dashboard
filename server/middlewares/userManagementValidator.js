const { body } = require('express-validator');
const { validateErrors } = require('../helper/helper');

exports.createPlayerAccount = [
   body('name', 'name is required')
      .isString()
      .withMessage('Name must be string')
      .isLength({ min: 2 })
      .withMessage('name min length 2 required'),
   body('email', 'please enter valid email')
      .isEmail()
      .trim()
      .isLength({ min: 5 })
      .normalizeEmail(),
   body('active', 'Account active status is reuqired!')
      .not()
      .isString()
      .withMessage('active type must be boolean')
      .isBoolean(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

// exports.createVipClubValidate = [
//    body('userRole', 'role is required')
//       .isString()
//       .withMessage('role must be string')
//       .isLength({ min: 2 })
//       .withMessage('role min length 2 required'),
//    body('reward', 'reward is required')
//       .trim()
//       .not()
//       .withMessage('reward must be point value'),
//    body('amount', 'amount is required')
//       .not()
//       .isNumeric()
//       .withMessage('amount must be number'),
//    body('points', 'points is required')
//       .trim()
//       .not()
//       .isNumeric()
//       .withMessage('points must be number value'),
//    body('name', 'name is required')
//       .not()
//       .isString()
//       .withMessage('name must be string')
//       .isLength({ min: 4 }),
//    body('level', 'level is required')
//       .trim()
//       .isNumeric(),
//    (req, res, next) => {
//       validateErrors(req, res, next);
//    },
// ];
