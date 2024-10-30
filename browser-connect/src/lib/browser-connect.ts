import {
  ConnectAdapter,
  ConnectSocketOptions,
  Connection,
  SioSocket,
  connect as _connect,
} from '@pipium/connect';

export function connect(
  get_id_token: () => Promise<string>,
  connections: Record<string, Connection>,
  options: ConnectSocketOptions = {},
) {
  const adapter = new ConnectBrowserAdapter(get_id_token);
  return _connect(adapter, new SioSocket(adapter, options), connections);
}

export class ConnectBrowserAdapter implements ConnectAdapter {
  readonly source = 'browser';

  constructor(private get_id_token: () => Promise<string>) {}

  log(message: string) {
    console['log'](`[Pipium] ${message}`);
  }

  async get_authentication_query() {
    const idToken = await this.get_id_token();

    return {
      'id-token': idToken,
    };
  }
}
