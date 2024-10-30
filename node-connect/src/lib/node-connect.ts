import {
  ConnectAdapter,
  ConnectSocketOptions,
  Connection,
  SioSocket,
  connect as _connect,
} from '@pipium/connect';
import chalk from 'chalk';

export function connect(
  api_key: string,
  connections: Record<string, Connection>,
  options: ConnectSocketOptions = {},
) {
  const adapter = new ConnectNodeAdapter(api_key);
  return _connect(adapter, new SioSocket(adapter, options), connections);
}

export class ConnectNodeAdapter implements ConnectAdapter {
  readonly source = 'user';

  constructor(private api_key: string) {}

  log(message: string) {
    console['log'](`${chalk.blueBright('[Pipium]')} ${message}`);
  }

  async get_authentication_query() {
    return {
      'api-key': this.api_key,
    };
  }
}
