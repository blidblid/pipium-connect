# Pipium Node.js client

This is the package that connects Node.js models with the [Pipium](https://pipium.com) platform.

## Installation

```bash
yarn add @pipium/node-connect
```

## Code

```typescript
import { connect } from '@pipium/node-connect';

connect('your-securely-stored-api-key', {
  hello_world: {
    name: 'Hello world!',
    run_sync: ({ text }) => 'Hello ' + text,
    types: {
      inputs: ['text/plain'],
      output: 'text/plain',
    },
  },
});
```
