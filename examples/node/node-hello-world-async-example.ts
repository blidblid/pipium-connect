import { connect } from '@pipium/node-connect';
import { config } from 'dotenv';

config();

const pipium_api_key = process.env['PIPIUM_API_KEY'];

if (!pipium_api_key) {
  throw new Error('API key is required');
}

connect(pipium_api_key, {
  hello_world: {
    run_async: async (input, observer) => {
      observer.next(`Hello ${input.text}`);
      observer.complete();
    },
    name: 'Hello, World!',
    types: {
      inputs: ['text/plain'],
      output: 'text/plain',
    },
  },
});
