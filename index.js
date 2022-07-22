require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');

const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const { resolve } = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack_conf/webpack.dev.js');

// import custom middleware
const authMiddleware = require('./middleware/checkUserLogin.js')();

// import models
const db = require('./models/index.js');

// import controllers
// const ModelController = require('./controllers/modelController.js');
const UserController = require('./controllers/userController.js');
// const MessageController = require('./controllers/messageController.js');

// initialise controllers
// const modelController = new ModelController(db.Model, db);
const userController = new UserController(db.User, db);
// const messageController = new MessageController(db.Message, db);

// import routers
// const ModelRouter = require('./routers/modelRouter.js');
const UserRouter = require('./routers/userRouter.js');
// const MessageRouter = require('./routers/messageRouter.js');

// initialise routers & middleware
// const modelRouter = new ModelRouter(modelController).router();
const userRouter = new UserRouter(userController, authMiddleware).router();
// const messageRouter = new MessageRouter(messageController).router();

// express app with socket
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

// express routing through routers
// app.use('/model', modelRouter);
app.get('/', (request, response) => {
  response.sendFile(resolve('dist', 'main.html'));
});

// app.use(checkUserLogin());

// express routing through routers
// app.use('/model', modelRouter);
app.use('/user', userRouter);
// app.use('/message', messageRouter);

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT} using HTTP`);
});

const io = socketio(server);

io.on('connect', (socket) => {
  socket.on('join', (joinData) => {
    // sends out a connect message
    const { city: room, username: name } = joinData;
    socket.join(room);
    // distributes join message to all connected users
    io.sockets.to(room).emit('connection message', { content: `${name} has joined the room` });
  });

  // this is to receive chat message from emitter
  socket.on('from frontend message', (message) => {
    // distributes chat message to all connected users
    io.sockets.in(message.city).emit('from backend message', message);
  });
});
