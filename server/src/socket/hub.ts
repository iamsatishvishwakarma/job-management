import WebSocket from 'ws';

const clients = new Set<WebSocket>();

export function addClient(ws: WebSocket) {
  clients.add(ws);
}

export function removeClient(ws: WebSocket) {
  clients.delete(ws);
}

export function getClients() {
  return clients;
}

export function countClients() {
  return clients.size;
}
