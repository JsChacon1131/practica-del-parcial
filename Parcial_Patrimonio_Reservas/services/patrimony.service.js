const mysql = require('mysql2/promise');
const config = require('../env/patrimonyConfig');
module.exports = mysql.createPool(config);
