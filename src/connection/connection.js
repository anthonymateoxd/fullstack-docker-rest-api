import mysql from 'mysql2/promise'; // better to use mysql2 with promises

const dbSettings = {
  host: 'mysql', // use 'mysql' (container name) instead of localhost if running in Docker
  user: 'root', // your MySQL username
  password: 'guest', // your MySQL password
  database: 'app', // your database (created in docker-compose)
  port: 3306, // default MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// const dbSettings = {
//   host: '127.0.0.1', // usa esto si Node.js está corriendo LOCALMENTE
//   user: 'root',
//   password: 'guest',
//   database: 'app',
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// };

export const getConnection = async () => {
  try {
    const pool = mysql.createPool(dbSettings);
    return pool;
  } catch (error) {
    console.error('❌ Error de conexión MySQL:', error);
    throw error;
  }
};
