import WebSocket from 'ws';
import { getClients } from './hub';

export function broadcast(data: any) {
  const payload = JSON.stringify(data);

  getClients().forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

export function sendWhere(predicate: (ws: any) => boolean, data: any) {
  const payload = JSON.stringify(data);

  getClients().forEach((ws: any) => {
    if (ws.readyState === WebSocket.OPEN && predicate(ws)) {
      ws.send(payload);
    }
  });
}
