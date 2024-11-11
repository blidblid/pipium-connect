import { connect, Connection, RunInput } from '@pipium/node-connect';
import { config } from 'dotenv';

config();

const pipium_api_key = process.env['PIPIUM_API_KEY'];

if (!pipium_api_key) {
  throw new Error('API key is required');
}

const connections: Record<string, Connection> = {
  crud: {
    run_sync: (input) => run(input),
    name: 'CRUD',
    widget_config: {
      form: {
        schema: {
          type: 'object',
          properties: {
            action: {
              title: 'Action',
              type: 'string',
              enum: ['add', 'delete'],
            },
          },
          allOf: [
            {
              if: {
                type: 'object',
                properties: { action: { const: 'add' } },
                required: ['action'],
              },
              then: {
                type: 'object',
                properties: {
                  title: { type: 'string', title: 'Title' },
                  content: { type: 'string', title: 'Content' },
                },
                required: ['title'],
              },
            },
            {
              if: {
                type: 'object',
                properties: { action: { const: 'delete' } },
                required: ['action'],
              },
              then: {
                type: 'object',
                properties: {
                  id: { type: 'string', title: 'ID' },
                },
                required: ['id'],
              },
            },
          ],
        },
      },
    },
    types: {
      inputs: ['application/json'],
      output: 'application/json',
    },
  },
};

connect(pipium_api_key, connections, {
  server_url: 'http://localhost:3000',
});

const state = {};
let id_counter = 0;

function run(input: RunInput) {
  const payload = JSON.parse(input.text);

  if (payload.action === 'add') {
    const id = String(id_counter++);
    state[id] = { id, title: payload.title, content: payload.content };
  }

  if (payload.action === 'delete') {
    delete state[payload.id];
  }

  return JSON.stringify(state, null, 2);
}
