import app from './app.js';
import http from 'http';

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});