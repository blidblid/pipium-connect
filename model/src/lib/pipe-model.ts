import { z } from 'zod';
import {
  PIPE_ID_SCHEMA,
  RESULT_ID_SCHEMA,
  USER_ID_SCHEMA,
} from './common-model';
import { INPUT_WIDGET_ID_SCHEMA } from './widget-model';

const ATTRIBUTES = {
  repetition: z
    .object({
      startLayerId: z
        .string()
        .describe('ID of the layer to start repeating at.'),
      endLayerId: z.string().describe('ID of the layer to end repeating at.'),
      count: z.coerce
        .number()
        .positive()
        .describe('Number of times to repeat the layers.'),
    })
    .describe('Repetition of Pipe layers.'),
};

export const PIPE_INPUTTER_SCHEMA = z
  .enum(['automatic', 'manual'])
  .describe(
    `Pipe inputter that controls how new inputs run the Pipe. An automatic inputter will run the Pipe automatically when input changes.`,
  );

export const PIPE_BODY_SCHEMA = z
  .object({
    name: z.string().describe('Pipe name.'),
    inputter: PIPE_INPUTTER_SCHEMA.optional(),
    repetition: ATTRIBUTES.repetition.optional(),
    description: z.string().optional().describe('Pipe description.'),
  })
  .describe('Pipe body.');

export const PIPE_SCHEMA = PIPE_BODY_SCHEMA.extend({
  id: PIPE_ID_SCHEMA,
  userId: USER_ID_SCHEMA,
});

export const PIPE_RUN_QUERY_SCHEMA = z.object({
  resultId: RESULT_ID_SCHEMA.optional(),
  inputWidgetId: INPUT_WIDGET_ID_SCHEMA.optional(),
  description: z.string().optional().describe('Input description.'),
});

export const PIPE_RUN_RESPONSE_SCHEMA = z.object({
  resultId: z.string(),
});

export type Pipe = z.infer<typeof PIPE_SCHEMA>;
export type PipeBody = z.infer<typeof PIPE_BODY_SCHEMA>;
export type PipeInputter = z.infer<typeof PIPE_INPUTTER_SCHEMA>;
export type PipeRepetition = z.infer<typeof ATTRIBUTES.repetition>;
export type PipeRunQuery = z.infer<typeof PIPE_RUN_QUERY_SCHEMA>;
export type PipeRunResponse = z.infer<typeof PIPE_RUN_RESPONSE_SCHEMA>;
