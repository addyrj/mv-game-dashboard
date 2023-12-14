const { catchAsync, httpStatusCodes } = require('../helper/helper');
const authModel = require('../model/schema/authSchema');
const {
   genrateAccessToken,
   genrateRefreshToken,
} = require('../helper/jwtHelper');
const bcryptjs = require('bcryptjs');
const random_name = require('node-random-name');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const axios = require('axios');
const { default: mongoose } = require('mongoose');

const roleModel = require('../model/schema/roleSchema');
const walletModel = require('../model/schema/walletSchema');
const currencyModel = require('../model/schema/currencySchema');
const userSettingModel = require('../model/schema/userSettingSchema');
const userSocialNetworkSchema = require('../model/schema/userSocialNetworkSchema');
const userHistoryModel = require('../model/schema/userHistorySchema');

const COLLECTION_STATE_COUNT = process.env.COLLECTION_STATE_COUNT;
const userEmail = process.env.USER_EMAIL;
const userAppPassword = process.env.USER_EMAIL_APP_PASSWORD;
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

// gmail service config object.
const MAIL_SETTINGS = {
   service: 'gmail',
   auth: {
      user: userEmail,
      pass: userAppPassword,
   },
};

const getUserAcocunInfo = function (data) {
   /**
    * @param accessToken genrate user access token.
    * @param refreshToken genrate user refresh token.
    * @param data object.
    * @param res object
    */

   const accessToken = genrateAccessToken({
      _id: data._id,
      userId: data?.userId,
   });
   const refreshToken = genrateRefreshToken({
      _id: data._id,
   });

   const authObject = {
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      _id: data._id,
      coins: data?.coins,
   };

   const userObject = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      auth: authObject,
   };

   return userObject;
   // set all the tokens and all the auth data.
   // res.cookie('_mv_games_access_token', accessToken);
   // res.cookie('_mv_games_refresh_token', refreshToken);
   // res.cookie('_mv_games_auth', authObject);
};

const userSignUp = catchAsync(async function (req, res, next) {
   const { email, password, check } = req.body;

   if (!check) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User agreement is reuqired',
      });
   }

   // check user email is exists or not.
   const findUserEmailIsExists = await authModel.findOne({
      email: email.toLowerCase(),
   });

   if (findUserEmailIsExists) {
      return res.status(httpStatusCodes.OK).json({
         error: true,
         success: false,
         message: 'Email already used',
      });
   } else {
      /**
       * genrate unique user id
       * genrate user opt to varify the user is real or fake.
       * send the opt to that selected email.
       * when the user sign in with new account then. first fetch the all currency data
       * then create the new user wallet collection document. which is contians user information.
       * or currency information. once user wallet is created then get the wallet id and store
       * wallet id into the user document.
       */

      // genrate user otp
      const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false,
      });

      const allCurrency = await currencyModel.find({}, { currencyName: 1 });

      if (!allCurrency) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Internal server error',
         });
      }

      // genrate user id
      const _id = mongoose.Types.ObjectId();

      let walletArray = allCurrency.map((el) => ({
         currencyId: el?._id,
         balance: mongoose.Types.Decimal128.fromString('0.00000000'),
      }));

      // check user wallet is already created or not.
      const isUserWalletAlreadyExists = await walletModel.findOne({
         userId: _id,
      });

      if (isUserWalletAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: false,
            message: 'Please use different account to login.',
         });
      }

      const createUserWallet = await walletModel({
         userId: _id,
         userWallet: walletArray,
      }).save();

      if (!createUserWallet) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Someting worng with creating user wallet.',
         });
      }

      if (createUserWallet) {
         // genrate unique user id
         const totalUsers = await authModel.countDocuments();
         const userId = totalUsers + Number(COLLECTION_STATE_COUNT);

         const createUserSettingDoc = await userSettingModel({
            userId: _id,
         }).save();

         if (!createUserSettingDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user setting document.',
            });
         }

         const createUserSocialNetworkDocument = await userSocialNetworkSchema({
            userId: _id,
         }).save();

         if (!createUserSocialNetworkDocument) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message:
                  'Someting worng with creating user social network document.',
            });
         }

         const createUserHistoryDoc = await userHistoryModel({
            userId: _id,
         }).save();

         if (!createUserHistoryDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user history document.',
            });
         }

         // store user information into the database
         const storeUserInfo = await authModel({
            _id,
            email,
            password,
            userId,
            name: random_name(),
            otp,
            userRole: [{ roleId: '63ee025a88d1991b27b2caec' }],
            coins: [
               {
                  coin: 'Gold',
                  balance: 1000,
               },
            ],
            walletId: createUserWallet._id,
         });

         // save user information
         const saveInfo = await storeUserInfo.save();

         if (!saveInfo) {
            throw Error('someting worng with creating user document');
         }

         await axios.post(
            `${process.env.CRYPTO_PAYMENT_SERVER}/testnet/addUser`,
            { userId: storeUserInfo?.userId }
         );

         // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport(MAIL_SETTINGS);

         const otp_access_token = jwt.sign(
            { _id: saveInfo._id, userId: saveInfo.userId, email: email },
            JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
         );

         // send the mail to the user.
         transporter.sendMail(
            {
               from: userEmail,
               to: email,
               subject: 'user signup request',
               html: `
                           <div
                           class="container"
                           style="max-width: 90%; margin: auto; padding-top: 20px"
                           >
                           <h2>Welcome to the club.</h2>
                           <h4>You are officially In ✔</h4>
                           <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
                           <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                        </div>
                        `,
            },
            function (err, _) {
               if (err) {
                  console.log(err);
               } else {
                  return res.status(httpStatusCodes.CREATED).json({
                     success: true,
                     error: false,
                     otp_token: otp_access_token,
                     message: 'please varify the opt. check your email inbox',
                  });
               }
            }
         );
      }
   }
});

const resendOtp = catchAsync(async function (req, res, next) {
   const { _id, userId, email } = req.body;
   // if user has not valid input then send back the error respose.
   if (!_id || !userId || !email) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         message: 'Invalid inputes',
      });
   }
   // if user has _id and the userid then genrate the new otp token.
   // send back the new otp token to client. and also send the otp into the email.
   // create reusable transporter object using the default SMTP transport
   // update the user otp filed in database.
   // when the user check and valify the otp then we want to varify latest otp with document
   // filed.
   // genrate new otp
   const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
   });

   // find the user from the database. and then update the otp filed.
   const findAndUpdateUserOtp = await authModel.updateOne(
      { _id },
      { $set: { otp } }
   );

   if (!!findAndUpdateUserOtp?.modifiedCount) {
      let transporter = nodemailer.createTransport(MAIL_SETTINGS);

      // genrate new otp token.
      const otp_access_token = jwt.sign(
         { _id, userId, email },
         JWT_ACCESS_TOKEN_SECRET,
         { expiresIn: '5m' }
      );
      // send the mail to the user.
      transporter.sendMail(
         {
            from: userEmail,
            to: email,
            subject: 'Resent otp request',
            html: `
         <div
           class="container"
           style="max-width: 90%; margin: auto; padding-top: 20px"
         >
           <h2>Welcome to the club.</h2>
           <h4>You are officially In ✔</h4>
           <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
           <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
      </div>
       `,
         },
         function (err, _) {
            if (err) {
               console.log(err);
            } else {
               return res.status(httpStatusCodes.CREATED).json({
                  success: true,
                  error: false,
                  otp_token: otp_access_token,
                  message: 'please verify the opt. check your email inbox',
               });
            }
         }
      );
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         error: true,
         msg: 'Internal server error',
      });
   }
});

const varifyOtp = catchAsync(async function (req, res, next) {
   const { otp } = req.body;
   const authToken = req.headers['authorization'];
   const token = authToken.split(' ')[1];

   if (!token) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         message: 'otp varfivation token is required!',
      });
   }

   const { _id } = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);

   // find the user is exists or not.
   const findUser = await authModel.findOne(
      { _id },
      {
         email: 1,
         name: 1,
         avatar: 1,
         coins: 1,
         userId: 1,
      }
   );

   if (findUser) {
      // check otp is valid or not.
      const varifyOtpIsValid = await authModel.findOne({
         _id,
         otp: { $eq: otp },
      });

      if (!varifyOtpIsValid) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            message: 'Otp is not valid',
            status: httpStatusCodes.BAD_REQUEST,
         });
      }

      // find user document and then update the active status.
      const findAndUpdateStatus = await authModel.updateOne(
         {
            _id,
            otp: { $eq: otp },
         },
         { $set: { active: true } }
      );

      if (!!findAndUpdateStatus?.modifiedCount) {
         const { accessToken, refreshToken } = getUserAcocunInfo(findUser);

         return res.status(httpStatusCodes.CREATED).json({
            error: false,
            success: true,
            user: findUser,
            accessToken,
            refreshToken,
         });
      }
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         message: 'No user found!',
      });
   }
});

const userSignIn = catchAsync(async function (req, res, next) {
   const { email, password } = req.query;

   // find user is exists or not
   const findUser = await authModel
      .findOne(
         { email: email.toLowerCase() },
         {
            email: 1,
            name: 1,
            avatar: 1,
            userRole: 1,
            coins: 1,
            password: 1,
            active: 1,
            userId: 1,
         }
      )
      .populate('userRole.roleId', { _id: 1, roleName: 1, default: 1 });

   if (!findUser) {
      return res.status(200).json({
         error: true,
         success: false,
         message: 'User email is not exists!',
      });
   }

   if (!findUser?.password) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Account has no password',
      });
   }

   // match the password
   const varifyPassword = await bcryptjs.compare(password, findUser.password);

   if (!varifyPassword) {
      return res.status(200).json({
         error: true,
         success: false,
         message: 'Account password is not match',
      });
   }

   // also check the user account is varifyed or not. if the user account is not varifyied
   // then send back the otp respose. and otp access token.
   if (findUser.active && varifyPassword) {
      const authObject = {
         email: findUser?.email,
         name: findUser?.name,
         avatar: findUser?.avatar,
         roles: findUser?.userRole,
         coins: findUser?.coins,
         userId: findUser?.userId,
         _id: findUser?._id,
      };
      const { accessToken, refreshToken } = getUserAcocunInfo(findUser);

      return res.status(httpStatusCodes.CREATED).json({
         error: false,
         success: true,
         user: authObject,
         accessToken,
         refreshToken,
      });
   }

   if (!findUser?.active && varifyPassword) {
      // genrate new otp
      const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false,
      });

      // update the opt from database.
      const updateUserOtp = await authModel.updateOne(
         { _id: findUser?._id },
         { $set: { otp } }
      );

      if (!!updateUserOtp?.modifiedCount) {
         // send back the otp respose with otp access token.
         let transporter = nodemailer.createTransport(MAIL_SETTINGS);

         // genrate new otp token.
         const otp_access_token = jwt.sign(
            { _id: findUser?._id, userId: findUser?.userId, email },
            JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
         );

         // send the mail to the user.
         transporter.sendMail(
            {
               from: userEmail,
               to: email,
               subject: 'Resent otp request',
               html: `
                     <div
                     class="container"
                     style="max-width: 90%; margin: auto; padding-top: 20px"
                     >
                     <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">
                     ${otp}
                     </h1>
                     </div>
                  `,
            },
            function (err, _) {
               if (err) {
                  console.log(err);
               } else {
                  return res.status(httpStatusCodes.CREATED).json({
                     success: true,
                     error: false,
                     otp_token: otp_access_token,
                     message:
                        'please varify your account first! check your email inbox',
                     otpRespose: true,
                  });
               }
            }
         );
      }
   }
});

const genrateUserAccessToken = catchAsync(async function (req, res, next) {
   const { userId, crUserId } = req.query;

   const accessToken = genrateAccessToken({
      _id: userId,
      userId: crUserId,
   });

   return res.status(httpStatusCodes.OK).json({
      error: false,
      success: true,
      accessToken,
   });
});

const signUpWithGoogle = catchAsync(async function (req, res, next) {
   const data = req.body;

   if (data) {
      const {
         email,
         email_verified,
         family_name,
         given_name,
         picture,
         azp,
         name,
      } = data;

      // check firrst email is already in database or not.
      // if email is already then don't need to create new collection.
      const findUserDocument = await authModel.findOne(
         { email },
         {
            email: 1,
            name: 1,
            avatar: 1,
            _id: 1,
            provider: 1,
            coins: 1,
            userId: 1,
         }
      );

      if (findUserDocument) {
         // if the user already exists in database then only return user information.
         // genrate user tokens
         const { accessToken, refreshToken, auth } =
            getUserAcocunInfo(findUserDocument);

         return res.status(httpStatusCodes.CREATED).json({
            error: false,
            success: true,
            user: findUserDocument,
            accessToken,
            refreshToken,
            auth,
         });
      } else {
         // genrate unique user id
         const totalUsers = await authModel.countDocuments();
         const userId = totalUsers + Number(COLLECTION_STATE_COUNT);

         // genrate new otp
         const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
         });

         const allCurrency = await currencyModel.find({}, { currencyName: 1 });

         if (!allCurrency) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Internal server error',
            });
         }

         // genrate user id
         const _id = mongoose.Types.ObjectId();

         let walletArray = allCurrency.map((el) => ({
            currencyId: el?._id,
            balance: mongoose.Types.Decimal128.fromString('0.00000000'),
         }));

         // check user wallet is already created or not.
         const isUserWalletAlreadyExists = await walletModel.findOne({
            userId: _id,
         });

         if (isUserWalletAlreadyExists) {
            return res.status(httpStatusCodes.OK).json({
               success: false,
               error: false,
               message: 'Please use different account to login.',
            });
         }

         // create user wallet.
         const createUserWallet = await walletModel({
            userId: _id,
            userWallet: walletArray,
         }).save();

         if (!createUserWallet) {
            throw Error('Someting worng with creating user wallet');
         }

         const createUserSettingDoc = await userSettingModel({
            userId: _id,
         }).save();

         if (!createUserSettingDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user setting document.',
            });
         }

         const createUserSocialNetworkDocument = await userSocialNetworkSchema({
            userId: _id,
         }).save();

         if (!createUserSocialNetworkDocument) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message:
                  'Someting worng with creating user social network document.',
            });
         }

         const createUserHistoryDoc = await userHistoryModel({
            userId: _id,
         }).save();

         if (!createUserHistoryDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user history document.',
            });
         }

         // store user information into the database
         const storeUserInfo = await authModel({
            _id,
            email,
            email_verified,
            name,
            family_name,
            given_name,
            azp,
            avatar: picture,
            provider: 'google',
            userId,
            active: true,
            otp,
            coins: [
               {
                  coin: 'Gold',
                  balance: 1000,
               },
            ],
            walletId: createUserWallet._id,
            userRole: [{ roleId: '63ee025a88d1991b27b2caec' }],
         }).save();

         if (storeUserInfo) {
            await axios.post(
               `${process.env.CRYPTO_PAYMENT_SERVER}/testnet/addUser`,
               { userId: storeUserInfo?.userId }
            );

            const authObject = {
               email: storeUserInfo.email,
               name: storeUserInfo.name,
               avatar: storeUserInfo.avatar,
               _id: storeUserInfo._id,
               provider: 'google',
               coins: storeUserInfo?.coins,
               userId: storeUserInfo?.userId,
            };

            // genrate user tokens
            const { accessToken, refreshToken, auth } =
               getUserAcocunInfo(authObject);

            return res.status(httpStatusCodes.CREATED).json({
               error: false,
               success: true,
               user: authObject,
               accessToken,
               refreshToken,
               auth,
            });
         }
      }
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         msg: 'User credential is required',
      });
   }
});

const forgetPassword = catchAsync(async function (req, res, next) {
   const { email } = req.body;

   if (email) {
      // check the email is exists or not
      const findUser = await authModel.findOne({ email });

      if (!findUser) {
         return res.status(httpStatusCodes.OK).json({
            msg: 'User email is not exists',
         });
      }

      // forget password ejs template path
      const filePath = path.join(
         __dirname,
         '..',
         'views',
         'templates',
         'forgetPassword.ejs'
      );

      // render the ejs template and then change the reset password path with token and link.
      // genrate the user access token for that reset link.
      // if user has the link and the reset access token then user can successfully reset the
      // password. but if user has link but don't have any token the user can't access the
      // reset popup form in client side.
      ejs.renderFile(filePath, (err, data) => {
         if (err) {
            console.log(err);
         } else {
            const _rq_password_token = jwt.sign(
               { _id: findUser._id, userId: findUser.userId },
               JWT_ACCESS_TOKEN_SECRET,
               { expiresIn: '5m' }
            );

            // replace the template link.
            const output = data.replace(
               `<a>testing-content</a>`,
               `<a class="large expand" href="${process.env.REACT_APP_BASE_URL}?user=${findUser.userId}&reset_password=${_rq_password_token}"
            style="font-family:Lato,sans-serif;height:50px;left:50%;margin:20px -100px;position:relative;top:50%;width:200px">RESET
            PASSWORD</a>`
            );

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(MAIL_SETTINGS);

            // send the mail to the user.
            transporter.sendMail(
               {
                  from: userEmail,
                  to: email,
                  subject: 'forget password request',
                  html: output,
               },
               function (err, _) {
                  if (err) {
                     console.log(err);
                  } else {
                     return res.status(httpStatusCodes.OK).json({
                        success: true,
                        msg: 'Please check your email',
                        _rq_password_token,
                     });
                  }
               }
            );
         }
      });
   } else {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         msg: 'User email is required',
      });
   }
});

const resetPassword = catchAsync(async function (req, res, next) {
   const { password } = req.body;

   if (!password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         msg: 'Password is required',
      });
   }

   const { resetPasswordToken } = req;

   // varify the token.
   const userInfo = jwt.verify(resetPasswordToken, JWT_ACCESS_TOKEN_SECRET);
   const { _id } = userInfo;

   // if there is no _id then send back the error response.
   if (!_id) {
      return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
         error: true,
         msg: 'user id is required',
         status: httpStatusCodes.NOT_ACCEPTABLE,
      });
   }

   // check the new password is same the old password.
   // if the new password and old password is same then send back the another resepose.
   // if not then user can change the account password.
   const findUserAccount = await authModel.findOne({ _id });

   if (!findUserAccount) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         error: true,
         msg: 'User account is not found',
      });
   }

   // check the password is same or not.
   const isSamePassword = await bcryptjs.compare(
      password,
      findUserAccount.password
   );

   if (isSamePassword) {
      return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
         error: true,
         message: 'Old and new password is same',
         status: httpStatusCodes.NOT_ACCEPTABLE,
      });
   } else {
      // create a hash password.
      const hashPassword = await bcryptjs.hash(password, 11);

      // find the user in database.
      const findUserAndUpdatePassword = await authModel.updateOne(
         { _id },
         {
            $set: {
               password: hashPassword,
            },
         }
      );

      if (!!findUserAndUpdatePassword?.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            error: false,
            success: true,
            message: 'your account password is reset',
            status: httpStatusCodes.CREATED,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            error: true,
            msg: 'Internal server error',
         });
      }
   }
});

const signInWithMetaMask = catchAsync(async function (req, res, next) {
   const { timestamp, walletAddress } = req.body;

   if (!walletAddress) {
      return res.status(httpStatusCodes.UNAUTHORIZATION).json({
         success: false,
         error: true,
         message: 'UNAUTHORIZATION USER',
      });
   }

   const allCurrency = await currencyModel.find({}, { currencyName: 1 });

   if (!allCurrency) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }

   // if the user account is already exists then send back the user information.
   const isUserAlreadyExists = await authModel.findOne(
      {
         metaMaskAddress: walletAddress,
      },
      { name: 1, avatar: 1, _id: 1, coins: 1, userId: 1, userRole: 1 }
   );

   if (isUserAlreadyExists) {
      // if the user already exists in database then only return user information.
      // genrate user tokens
      const { accessToken, refreshToken, auth } =
         getUserAcocunInfo(isUserAlreadyExists);

      return res.status(httpStatusCodes.CREATED).json({
         error: false,
         success: true,
         user: isUserAlreadyExists,
         accessToken,
         refreshToken,
         auth,
      });
   }

   // when the user account is not created then create new account and the new wallet.
   // genrate user id
   const _id = mongoose.Types.ObjectId();

   let walletArray = allCurrency.map((el) => ({
      currencyId: el?._id,
      balance: mongoose.Types.Decimal128.fromString('0.00000000'),
   }));

   // check user wallet is already created or not.
   const isUserWalletAlreadyExists = await walletModel.findOne({
      userId: _id,
   });

   if (isUserWalletAlreadyExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: false,
         message: 'Please use different account to login.',
      });
   }

   // create user wallet.
   const createUserWallet = await walletModel({
      userId: _id,
      userWallet: walletArray,
   }).save();

   if (!createUserWallet) {
      throw Error('Someting worng with creating user wallet');
   }

   const createUserSettingDoc = await userSettingModel({
      userId: _id,
   }).save();

   if (!createUserSettingDoc) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Someting worng with creating user setting document.',
      });
   }

   const createUserSocialNetworkDocument = await userSocialNetworkSchema({
      userId: _id,
   }).save();

   if (!createUserSocialNetworkDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Someting worng with creating user social network document.',
      });
   }

   const createUserHistoryDoc = await userHistoryModel({
      userId: _id,
   }).save();

   if (!createUserHistoryDoc) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Someting worng with creating user history document.',
      });
   }

   if (createUserWallet) {
      // genrate userid with count
      const totalUsers = await authModel.countDocuments();
      const userId = totalUsers + Number(COLLECTION_STATE_COUNT);

      // genrate user otp
      const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false,
      });

      // save user info in database
      const saveUserInfo = await authModel({
         _id,
         name: random_name(),
         metaMaskAddress: walletAddress,
         createdAt: timestamp,
         userId,
         active: true,
         otp,
         coins: [
            {
               coin: 'Gold',
               balance: 1000,
            },
         ],
         walletId: createUserWallet._id,
         userRole: [{ roleId: '63ee025a88d1991b27b2caec' }],
      }).save();

      if (saveUserInfo) {
         await axios.post(
            `${process.env.CRYPTO_PAYMENT_SERVER}/testnet/addUser`,
            { userId: saveUserInfo?.userId }
         );

         const authObject = {
            name: saveUserInfo.name,
            avatar: saveUserInfo.avatar,
            _id: saveUserInfo._id,
            coins: saveUserInfo?.coins,
            userId: saveUserInfo?.userId,
         };

         // genrate user tokens
         const { accessToken, refreshToken, auth } =
            getUserAcocunInfo(authObject);

         return res.status(httpStatusCodes.CREATED).json({
            error: false,
            success: true,
            user: authObject,
            accessToken,
            refreshToken,
            auth,
         });
      }
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Bad request',
   });
});

module.exports = {
   userSignUp,
   resendOtp,
   userSignIn,
   varifyOtp,
   genrateUserAccessToken,
   signUpWithGoogle,
   forgetPassword,
   resetPassword,
   signInWithMetaMask,
};
