import { connect } from '@pipium/node-connect';
import { config } from 'dotenv';

config();

const pipium_api_key = process.env['PIPIUM_API_KEY'];

if (!pipium_api_key) {
  throw new Error('API key is required');
}

connect(pipium_api_key, {
  hello_world: {
    run_sync: () => 'Hello, World!',
    name: 'Hello, World!',
    types: {
      inputs: ['text/plain'],
      output: 'text/plain',
    },
  },
});
