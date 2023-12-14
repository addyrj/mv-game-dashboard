const express = require('express');
const router = express.Router();
const {
   jwtRefreshTokenVarification,
   varifyUserResetPasswordToken,
   varifyJwtToken,
} = require('../helper/jwtHelper');
const authController = require('../controllers/authController');
const {
   userValidator,
   userPasswordValidator,
} = require('../middlewares/userValidator');
const { userEmailValidator } = require('../middlewares/userValidator');

// API => GET
router.get('/signIn', authController.userSignIn);
// API => POST
router.post('/signUp', userValidator, authController.userSignUp);
router.post(
   '/refresh-token',
   jwtRefreshTokenVarification,
   authController.genrateUserAccessToken
);
router.post('/signUp-with-google', authController.signUpWithGoogle);
router.post(
   '/forget-password',
   userEmailValidator,
   authController.forgetPassword
);
router.post('/signIn-with-meta-mask', authController.signInWithMetaMask);

// API => PATCH
router.patch(
   '/reset-password',
   userPasswordValidator,
   varifyUserResetPasswordToken,
   authController.resetPassword
);
router.post('/resend-otp', authController.resendOtp);
router.post('/varify-otp', varifyJwtToken, authController.varifyOtp);

module.exports = router;
