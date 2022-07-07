const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack_conf/webpack.dev.js');

// import models
const db = require('./models/index.js');

// import controllers
// const ModelController = require('./controllers/modelController.js');
// initialise controllers
// const modelController = new ModelController(db.Model, db);

// import routers
// const ModelRouter = require('./routers/modelRouter.js');
// initialise routers
// const modelRouter = new ModelRouter(modelController).router();

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
const env = process.env.NODE_ENV || 'development';
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
app.get('/', (request, response) => response.redirect('/user/login'));

// checking if user is logged in.
// send to login page if not logged in.
// !update cookie names in here!
app.use((request, response, next) => {
  request.userLoggedIn = false;
  if (request.cookies.loggedIn && request.cookies.userID) {
    request.userLoggedIn = true;
  }
  next();
});

const PORT = process.env.PORT || 3004;
app.listen(PORT);
