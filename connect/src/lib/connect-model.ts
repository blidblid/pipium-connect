import { ModelSource } from '@pipium/model';

export interface ConnectSocketOptions {
  server_url?: string;
}

export type ConnectEvent =
  | 'exception'
  | 'pp-complete'
  | 'pp-connect'
  | 'pp-error'
  | 'pp-init'
  | 'pp-log'
  | 'pp-log-error'
  | 'pp-result'
  | 'pp-run'
  | 'pp-start';

export interface ConnectAdapter {
  source: ModelSource;
  log: (message: string) => void;
  get_authentication_query: () => Promise<ConnectAuthenticationQuery>;
}

export interface ConnectSocket {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: ConnectEvent, listener: (payload: any) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: ConnectEvent, payload: any): void;
}

export type ConnectAuthenticationQuery =
  | {
      'api-key': string;
    }
  | {
      'id-token': string;
    };
