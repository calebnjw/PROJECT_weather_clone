require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');

const cookieParser = require('cookie-parser');

const { resolve } = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack_conf/webpack.dev.js');

// import socket config
const socketConfig = require('./sockets/sockets.js');

// import custom middleware
const authMiddleware = require('./middleware/checkUserLogin.js')();

// import models
const db = require('./models/index.js');

// import controllers
const UserController = require('./controllers/userController.js');

const userController = new UserController(db.User, db);

// import routers
const UserRouter = require('./routers/userRouter.js');

const userRouter = new UserRouter(userController, authMiddleware).router();

// express app with socket
const app = express();

// express middleware
app.use(cookieParser());
app.use(express.json());

const { NODE_ENV: env } = process.env;
if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

app.get('/', (request, response) => {
  response.sendFile(resolve('dist', 'main.html'));
});

app.use('/user', userRouter);

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT} using HTTP`);
});

// sockets config (how to separate this out?)
const io = socketio(server);
socketConfig(io);
