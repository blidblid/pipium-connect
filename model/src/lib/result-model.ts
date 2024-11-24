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

export const RESULT_STATE_TYPE_SCHEMA = z
  .enum(['complete', 'error', 'running', 'waiting'])
  .describe('State of the result.');

export const RESULT_STATE_SCHEMA = z
  .object({
    type: RESULT_STATE_TYPE_SCHEMA,
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

export const RESULT_WATCH_QUERY_SCHEMA = z.object({
  timeout: z
    .number()
    .positive()
    .optional()
    .default(1000 * 60 * 60)
    .describe(
      'Milliseconds before watcher times out and returns the latest result.',
    ),
  minValues: z
    .number()
    .positive()
    .optional()
    .default(1)
    .describe('Match minimum number of values before returning the result.'),
  stateType: RESULT_STATE_TYPE_SCHEMA.optional()
    .default('complete')
    .describe('Match state type before returning the result.'),
});

export type ResultBody = z.infer<typeof RESULT_BODY_SCHEMA>;
export type Result = z.infer<typeof RESULT_SCHEMA>;
export type ResultError = z.infer<typeof RESULT_ERROR_SCHEMA>;
export type ResultState = z.infer<typeof RESULT_STATE_SCHEMA>;
export type ResultValue = z.infer<typeof RESULT_VALUE_SCHEMA>;
export type ResultWatchQuery = z.infer<typeof RESULT_WATCH_QUERY_SCHEMA>;
export type ResultStateType = ResultState['type'];
