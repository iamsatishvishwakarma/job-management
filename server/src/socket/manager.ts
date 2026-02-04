import { WebSocketServer } from 'ws';
import WebSocket from 'ws';
import { addClient, removeClient, getClients } from '@/socket/hub';

import { handleMessage } from '@/socket/router';

let wss: WebSocketServer | null = null;

export function initWS(server: any) {
  wss = new WebSocketServer({
    server,
    maxPayload: 1024 * 1024,
    perMessageDeflate: false,
  });

  console.log('WS Started');

  wss.on('connection', (ws) => {
    addClient(ws);

    ws.on('message', (msg) => {
      handleMessage(ws, msg.toString());
    });

    ws.on('close', () => removeClient(ws));
    ws.on('error', () => removeClient(ws));
  });

  startHeartbeat();
}

/**
 * Kill dead connections
 */
function startHeartbeat() {
  setInterval(() => {
    getClients().forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    });
  }, 30000);
}
