const constants = {
  MONGO_URI: process.env.MONGO_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  ADMIN_TOKEN_SECRET: process.env.ADMIN_TOKEN_SECRET,
  USER_TOKEN_SECRET: process.env.USER_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.REFRESH_TOKEN_SECRET,
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME,
  PORT: process.env.PORT,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
};
module.exports = constants;
