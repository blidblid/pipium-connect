import { z } from 'zod';
import { API_KEY_ID_SCHEMA, USER_ID_SCHEMA } from './common-model';

export const API_KEY_BODY_SCHEMA = z.object({});

export const CREATE_API_KEY_RESPONSE_SCHEMA = z.object({
  id: API_KEY_ID_SCHEMA,
  key: z.string().describe('API key.'),
});

export const API_KEY_SCHEMA = API_KEY_BODY_SCHEMA.extend({
  id: API_KEY_ID_SCHEMA,
  hash: z.string().describe('Hash of the API key.'),
  userId: USER_ID_SCHEMA,
  created: z.date().describe('Date the API key was created.'),
});

export type ApiKeyBody = z.infer<typeof API_KEY_BODY_SCHEMA>;

export type CreateApiKeyResponse = z.infer<
  typeof CREATE_API_KEY_RESPONSE_SCHEMA
>;

export type ApiKey = z.infer<typeof API_KEY_SCHEMA>;
