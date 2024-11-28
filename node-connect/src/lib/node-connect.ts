import {
  ConnectAdapter,
  ConnectSocketOptions,
  Model,
  SioSocket,
  connect as _connect,
} from '@pipium/connect';
import chalk from 'chalk';

/**
 * Connect models to Pipium.
 *
 * @param api_key API key for the user the models will be added to. Create one in the [Pipium settings](https://pipium.com/settings).
 * @param models A record of `Model` objects, indexed by their ID.
 * @param options Socket options for the connection.
 * @returns
 */
export function connect(
  api_key: string,
  models: Record<string, Model>,
  options: ConnectSocketOptions = {},
) {
  const adapter = new ConnectNodeAdapter(api_key);
  return _connect(adapter, new SioSocket(adapter, options), models);
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
