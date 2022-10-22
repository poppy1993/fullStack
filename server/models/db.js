const mysql = require('mysql2');
// const mysql = require('mysql2/promise');


// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'ITEMS',
});

module.exports = connection.promise();
