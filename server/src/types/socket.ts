import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
  OPEN: any;
  readyState: any;
}

export type WSStatus = 'connecting' | 'connected' | 'disconnected';

export type MessageHandler = (message: string) => void;

export interface IncomingMessage<T> {
  type: string;
  data: T;
}

