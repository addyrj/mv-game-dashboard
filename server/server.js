require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const databaseConnection = require('./model/database/db');
const path = require('path');
const { removeLiveSupportDocuments } = require('./cron/liveSupport.service');
const cron = require('node-cron');

// middlewares
app.disable('x-powered-by');
app.use(
   cors({
      origin: '*',
   }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(
   helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
         'img-src': ["'self'", 'https: data:'],
      },
   }),
);
app.use(express.static(path.join(path.resolve(__dirname), 'build')));

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
   );
   next();
});

if (process.env.NODE_ENV == 'production') {
   // for build file
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
   });
}

const adminRoute = require('./routes/adminRoute');
const userRolesRoute = require('./routes/userRoleRoute');
const adminToolsRoute = require('./routes/adminToolsRoute');
const gameProviderRoute = require('./routes/gameProviderRoute');
const gameCurrencyRoute = require('./routes/gameCurrencyRoute');
const gameRoute = require('./routes/gameRoute');
const paymentRoute = require('./routes/paymentRoute');
const notificationRoute = require('./routes/notificationRoute');
const luckyDraw = require('./routes/luckyDrawRoute');
const mediaRoute = require('./routes/mediaRoute');
const userManagementRoute = require('./routes/userManagementRoute');
const faqRoute = require('./routes/faqRoute');
const liveSupportRoute = require('./routes/liveSupportRoute');
const authRoute = require('./routes/authRouter');
const vipClubRoute = require('./routes/vipClubRoute');

app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user-role', userRolesRoute);
app.use('/game-provider', gameProviderRoute);
app.use('/game-currency', gameCurrencyRoute);
app.use('/admin-tools', adminToolsRoute);
app.use('/games', gameRoute);
app.use('/payment', paymentRoute);
app.use('/notification', notificationRoute);
app.use('/lucky-draw', luckyDraw);
app.use('/media', mediaRoute);
app.use('/userManagement', userManagementRoute);
app.use('/faq', faqRoute);
app.use('/support', liveSupportRoute);
app.use('/vip-club', vipClubRoute);

// for build file
app.get('*', (req, res) => {
   res.sendFile(path.join(path.resolve(__dirname), 'build', 'index.html'));
});

// Schedule the cron job to run every day at 1 AM
cron.schedule('0 1 * * *', () => {
   removeLiveSupportDocuments();
});

// In this case it is an HTTP server
// database connection function
databaseConnection(() => {
   // server listen
   server.listen(port, () => {
      console.log(`server is running in port ${port}`);
   });
});
