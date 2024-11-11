import { connect, Connection } from '@pipium/node-connect';
import { config } from 'dotenv';

config();

const google_api_key = process.env['GOOGLE_API_KEY'];
const pipium_api_key = process.env['PIPIUM_API_KEY'];

if (!google_api_key) {
  throw new Error('Google API key is required');
}

if (!pipium_api_key) {
  throw new Error('Pipium API key is required');
}

const connections: Record<string, Connection> = {
  google_translate: {
    name: 'Google Translate',
    types: {
      inputs: ['text/plain'],
      output: 'text/plain',
    },
    schema: {
      type: 'object',
      properties: {
        target: {
          title: 'Target',
          type: 'string',
          enum: ['de', 'en', 'es', 'sv', 'zh'],
          default: 'en',
        },
      },
      required: ['target'],
    },
    run_sync: async ({ text, config }) => {
      // https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
      const endpoint =
        'https://translation.googleapis.com/language/translate/v2';

      const params = {
        q: text,
        format: 'text',
        target: config.target,
        key: google_api_key,
      };

      const response = await fetch(
        `${endpoint}?${new URLSearchParams(params).toString()}`,
        {
          method: 'POST',
        },
      );

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return json.data.translations[0].translatedText;
    },
  },
  google_speech_to_text: {
    name: 'Google Speech to Text',
    types: {
      inputs: ['audio/wav', 'audio/webm'],
      output: 'text/plain',
    },
    schema: {
      type: 'object',
      properties: {
        languageCode: {
          title: 'Language',
          type: 'string',
          enum: ['de', 'en', 'es', 'sv', 'zh'],
          default: 'en',
        },
      },
      required: ['languageCode'],
    },
    run_sync: async ({ binary }) => {
      // https://cloud.google.com/speech-to-text/docs/reference/rest/v1/speech/recognize
      const endpoint = 'https://speech.googleapis.com/v1/speech:recognize';

      const params = {
        key: google_api_key,
      };

      const body = {
        audio: {
          content: arrayBufferToBase64(binary),
        },
        config: {
          languageCode: 'en-US',
        },
      };

      const response = await fetch(
        `${endpoint}?${new URLSearchParams(params).toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
      );

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      if (!Array.isArray(json.results) || json.results.length === 0) {
        return 'Inaudible or no speech detected.';
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return json.results.reduce((acc: string, result: any) => {
        const transcript = result.alternatives[0].transcript;

        if (acc.length === 0) {
          return transcript;
        }

        return `${acc}, ${transcript}`;
      }, '');
    },
  },
};

connect(pipium_api_key, connections, {
  server_url: 'http://localhost:3000',
});

function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(arrayBuffer);

  let binary = '';

  for (let i = 0; i < uint8Array.byteLength; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }

  return btoa(binary);
}
