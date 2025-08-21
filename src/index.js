import app from './app.js';
import { getConnection } from './connection/connection.js';

getConnection();
app.listen(4000);
console.log('The server is listening on port: ', 4000);
