import config from '@/configs/app.config'
import app from '@/app';
import http from 'http';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});