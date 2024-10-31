# Pipium connect

This repository contains the clients that connect models with the [Pipium](https://pipium.com) platform. If you're missing a language, just open an issue, with the only requirement being that the language has an official Socket.IO client.

# Installation

## Python

```bash
pip install pipium-connect
```

```python
from pipium_connect import connect

connect(
    "your-securely-stored-api-key",
    {
      "hello_world": {
          "name": "Hello world!",
          "run_sync": lambda input: "Hello " + input["text"],
          "types": {
              "inputs": ["text/plain"],
              "output": "text/plain",
          },
      },
    }
)
```

## Node.js

```bash
yarn add @pipium/node-connect
```

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
