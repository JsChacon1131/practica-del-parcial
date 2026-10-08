const mysql = require('mysql2/promise');
const config = require('../env/bookingConfig');
module.exports = mysql.createPool(config);
