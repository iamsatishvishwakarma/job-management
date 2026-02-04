import { on } from './router';
import { broadcast } from './emitter';

on('ping', (ws) => {
  ws.send(JSON.stringify({ type: 'pong' }));
});

on('notify-all', (_ws, payload) => {
  broadcast({
    type: 'notification',
    payload,
  });
});

on('subscribe-job', (ws, jobId) => {
  ws.jobId = jobId;
});

on('unsubscribe-job', (ws) => {
  delete ws.jobId;
});
