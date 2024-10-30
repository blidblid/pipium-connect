import { z } from 'zod';
import {
  LAYER_ID_SCHEMA,
  PIPE_ID_SCHEMA,
  USER_ID_SCHEMA,
} from './common-model';

export const RESULT_ERROR_SCHEMA = z
  .object({
    message: z.string().describe('Error message.'),
    date: z.date().describe('Date the error occurred.'),
  })
  .describe('Result error.');

export const RESULT_STATE_SCHEMA = z
  .object({
    type: z
      .enum(['complete', 'error', 'running', 'waiting'])
      .describe('State of the result.'),
    date: z.date().describe('Date the state was set.'),
  })
  .describe('State of the result.');

export const RESULT_VALUE_SCHEMA = z
  .object({
    uri: z.string().describe('URI used to download the value.'),
    description: z.string().describe('Value description.'),
    date: z.date().describe('Date the value was created.'),
  })
  .describe('Result value.');

export const RESULT_BODY_SCHEMA = z.object({
  pipeId: PIPE_ID_SCHEMA,
  layerId: LAYER_ID_SCHEMA,
  state: RESULT_STATE_SCHEMA,
  values: z.array(RESULT_VALUE_SCHEMA).describe('Values of this result.'),
  error: RESULT_ERROR_SCHEMA.optional().nullable(),
});

export const RESULT_SCHEMA = RESULT_BODY_SCHEMA.extend({
  id: z.string(),
  userId: USER_ID_SCHEMA,
  date: z.date().describe('Date the result was created.'),
});

export const RESULT_GET_QUERY_SCHEMA = z.object({
  timeout: z
    .number()
    .positive()
    .default(1000 * 60 * 60),
});

export type ResultBody = z.infer<typeof RESULT_BODY_SCHEMA>;
export type Result = z.infer<typeof RESULT_SCHEMA>;
export type ResultError = z.infer<typeof RESULT_ERROR_SCHEMA>;
export type ResultState = z.infer<typeof RESULT_STATE_SCHEMA>;
export type ResultValue = z.infer<typeof RESULT_VALUE_SCHEMA>;
export type ResultGetQuery = z.infer<typeof RESULT_GET_QUERY_SCHEMA>;
export type ResultStateType = ResultState['type'];
