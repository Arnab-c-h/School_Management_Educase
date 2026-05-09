require('dotenv').config();

const toBoolean = (value) => String(value).toLowerCase() === 'true';
const valueFrom = (...keys) => keys.map((key) => process.env[key]).find(Boolean);

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 6999,
  db: {
    host: valueFrom('MYSQLHOST', 'DB_HOST'),
    port: Number(valueFrom('MYSQLPORT', 'DB_PORT')) || 3306,
    user: valueFrom('MYSQLUSER', 'DB_USER'),
    password: valueFrom('MYSQLPASSWORD', 'DB_PASSWORD'),
    database: valueFrom('MYSQLDATABASE', 'DB_NAME'),
    ssl: toBoolean(valueFrom('MYSQL_SSL', 'DB_SSL')),
  },
};
