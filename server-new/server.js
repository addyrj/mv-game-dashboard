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
const socketIO = require('socket.io');
const io = socketIO(server);
const { socketIoConnection } = require('./socket/socketIo');
const { logErrors } = require('./helper/helper');

// const numCPUs = require('node:os').cpus().length;
// const cluster = require('node:cluster');

// const options = {
//    key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
//    cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem')),
// };

// middlewares
app.set('socketIo', io);
app.use(
   cors({
      origin: '*',
   })
);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
   helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
         'img-src': ["'self'", 'https: data:'],
      },
   })
);
app.use(express.static(path.join(path.resolve(__dirname), 'build')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
   );
   next();
});
app.use(logger('dev'));
app.use(logErrors);

if (process.env.NODE_ENV === 'production') {
   // for more information about requests.
   app.use(logger('combined'));
   // for build file
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
   });
}

// API Routes
const authRouter = require('./routes/authRoute');
const clientRouter = require('./routes/clientRoute');
const groupRouter = require('./routes/groupRoute');
const gameRoute = require('./routes/gameRoute');
const paymentRoute = require('./routes/paymentRoute');
const notificationRoute = require('./routes/notificationRoute');
const luckyDraw = require('./routes/luckyDrawRoute');

// Api Routes paths
app.use('/auth', authRouter);
app.use('/client', clientRouter);
app.use('/group', groupRouter);
app.use('/game', gameRoute);
app.use('/payment', paymentRoute);
app.use('/notification', notificationRoute);
app.use('/lucky-draw', luckyDraw);

// for build file
app.get('*', (req, res) => {
   res.sendFile(path.join(path.resolve(__dirname), 'build', 'index.html'));
});

// if (cluster.isPrimary) {
//    console.log(`Primary ${process.pid} is running`);

//    for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//    }

//    cluster.on('exit', (Worker, code, signal) => {
//       console.log(`Worker ${Worker.process.pid} died`);
//    });
// } else {
//    // In this case it is an HTTP server
//    // database connection function
//    databaseConnection(() => {
//       // server listen
//       server.listen(port, () => {
//          console.log(`server is running in port ${port}`);
//          socketIoConnection(io);
//       });
//    });

//    console.log(`Woker ${process.pid} is running`);
// }

// In this case it is an HTTP server
// database connection function
databaseConnection(() => {
   // server listen
   server.listen(port, () => {
      console.log(`server is running in port ${port}`);
      socketIoConnection(io);
   });
});

module.exports = io;
