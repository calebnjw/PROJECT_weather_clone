require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD || 'null',
    database: process.env.DB_DEV_NAME || 'weather_development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};
