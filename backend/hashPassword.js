const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log(' Script started');

    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Vishmi2828',
      database: 'world',
      port: 3306
    });

    console.log(' MySQL connected');

    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log(' Password hashed');

    const [result] = await db.execute(
      'UPDATE admin SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@techvira.com']
    );

    console.log(' Rows affected:', result.affectedRows);

    if (result.affectedRows === 0) {
      console.log(' No admin found with that email');
    } else {
      console.log(' Password updated successfully');
    }

    await db.end();
    process.exit(0);
  } catch (err) {
    console.error(' ERROR:', err.message);
    process.exit(1);
  }
})();
