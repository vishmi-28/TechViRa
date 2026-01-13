const mysql = require('mysql2/promise');

(async () => {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ' Vishmi2828',
    database: 'world',
  });

  const [rows] = await db.query('SHOW TABLES');
  console.log(rows);

  process.exit();
})();
