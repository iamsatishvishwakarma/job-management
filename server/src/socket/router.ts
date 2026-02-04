type Handler = (ws: any, payload: any) => void;

const routes = new Map<string, Handler>();

export function on(type: string, handler: Handler) {
  routes.set(type, handler);
}

export function handleMessage(ws: any, raw: string) {
  try {
    const msg = JSON.parse(raw);

    const handler = routes.get(msg.type);

    if (handler) {
      handler(ws, msg.payload);
    }
  } catch {
    console.error('Invalid WS message');
  }
}
