require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const { resolve } = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack_conf/webpack.dev.js');

// import custom middleware
const checkUserLogin = require('./middleware/checkUserLogin.js');

// import models
const db = require('./models/index.js');

// import controllers
// const ModelController = require('./controllers/modelController.js');
const UserController = require('./controllers/userController.js');
const MessageController = require('./controllers/messageController.js');

// initialise controllers
// const modelController = new ModelController(db.Model, db);
const userController = new UserController(db.User, db);
const messageController = new MessageController(db.Message, db);

// import routers
// const ModelRouter = require('./routers/modelRouter.js');
const UserRouter = require('./routers/userRouter.js');
const MessageRouter = require('./routers/messageRouter.js');

// initialise routers
// const modelRouter = new ModelRouter(modelController).router();
const userRouter = new UserRouter(userController).router();
const messageRouter = new MessageRouter(messageController).router();

// express app
const app = express();
app.set('view engine', 'ejs');

// express middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// express static folders
app.use(express.static('public'));
app.use(express.static('dist'));

// this section asks webpack to package our files
// whenever we run nodemon index.js
const { NODE_ENV: env } = process.env.NODE_ENV;
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

// express routing through routers
// app.use('/model', modelRouter);
app.get('/', (request, response) => {
  response.sendFile(resolve('dist', 'main.html'));
});

app.use(checkUserLogin());

// express routing through routers
// app.use('/model', modelRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

const { PORT } = process.env;
app.listen(PORT);
