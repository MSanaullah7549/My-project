import mysql from 'mysql2/promise';

let pool;

const connectMySQL = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });

    const [rows] = await pool.query('SELECT 1');
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
};

export const getPool = () => pool;
export default connectMySQL;
