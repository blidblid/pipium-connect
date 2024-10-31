import { io, Socket } from 'socket.io-client';
import {
  ConnectAdapter,
  ConnectSocket,
  ConnectSocketOptions,
} from './connect-model';

export class SioSocket implements ConnectSocket {
  private socket: Socket | null = null;
  private socket_listeners: ((socket: Socket) => void)[] = [];

  constructor(
    private adapter: ConnectAdapter,
    private connect_options: ConnectSocketOptions,
  ) {
    this.init();
  }

  on(event: string, listener: (payload: unknown) => void): void {
    this.get_socket().then((socket) => {
      socket.on(event, (value) => {
        listener(value);
      });
    });
  }

  emit(event: string, payload: unknown): void {
    this.get_socket().then((socket) => {
      socket.emit(event, payload);
    });
  }

  private async get_socket() {
    if (this.socket) {
      return this.socket;
    }

    return new Promise<Socket>((resolve) => {
      // Multicast the socket using listeners.
      this.socket_listeners.push((socket: Socket) => {
        resolve(socket);
      });
    });
  }

  private async init() {
    const authentication_query = await this.adapter.get_authentication_query();

    this.socket = this.create_socket(
      this.connect_options.server_url ??
        'https://server-production-00001-pq8-vauf4uyfmq-ey.a.run.app',
      authentication_query,
    );

    for (const socket_listener of this.socket_listeners) {
      socket_listener(this.socket);
    }
  }

  private create_socket(serverUrl: string, query: Record<string, string>) {
    const socket = io(serverUrl, {
      transports: ['websocket'],
      query,
    });

    socket.prependAnyOutgoing(async () => {
      socket.io.opts.query = await this.adapter.get_authentication_query();
    });

    return socket;
  }
}
