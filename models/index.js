const { Sequelize } = require('sequelize');
const allConfig = require('../config/config.js');

// import models
// const initModel = require(./model.js);
const initUserModel = require('./user.js');
const initUserLocationModel = require('./userLocation.js');

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// add model definitions to db
// db.Model = initModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.UserLocation = initUserLocationModel(sequelize, Sequelize.DataTypes);

// associations between models
// one to many:
// db.Model.belongsTo(db.Model);
// db.Model.hasMany(db.Model);
// many to many:
// db.Model.belongsToMany(db.Model);
db.User.hasMany(db.UserLocation);
db.UserLocation.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
