const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_CLUSTER_URL = process.env.DB_CLUSTER_URL
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`,
}

const SESSION = {
  COOKIE_KEY: 'spamoni',
}

const KEYS = {
  ...MONGODB,
  ...SESSION,
  PORT: process.env.PORT,
}

module.exports = KEYS
