module.exports = {
  development: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mysql'
  },
  staging: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mysql'
  },
  test: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mysql'
  }
};
