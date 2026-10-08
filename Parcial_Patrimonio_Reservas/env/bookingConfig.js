require('dotenv').config();
module.exports = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.BOOKING_DB || 'reservas',
  waitForConnections: true,
  connectionLimit: 10
};
