import { z } from 'zod';
import {
  INPUT_ID_SCHEMA,
  PIPE_ID_SCHEMA,
  USER_ID_SCHEMA,
} from './common-model';
import { INPUT_WIDGET_ID_SCHEMA } from './widget-model';
import { MIME_TYPE_SCHEMA } from './mime-model';

export const INPUT_VALUE_SCHEMA = z
  .object({
    uri: z.string().describe('URI used to download the value.'),
    description: z.string().describe('Value description.'),
    date: z.date().describe('Date the value was created.'),
    type: MIME_TYPE_SCHEMA.describe('Value MIME type.'),
    inputWidgetId: INPUT_WIDGET_ID_SCHEMA.optional().describe(
      'UI component that created this input if applicable.',
    ),
  })
  .describe('Input value.');

export const INPUT_BODY_SCHEMA = z.object({
  pipeId: PIPE_ID_SCHEMA,
  values: z.array(INPUT_VALUE_SCHEMA).describe('Input values.'),
});

export const INPUT_SCHEMA = INPUT_BODY_SCHEMA.extend({
  id: INPUT_ID_SCHEMA,
  userId: USER_ID_SCHEMA,
  date: z.date().describe('Date the input was created.'),
});

export type InputBody = z.infer<typeof INPUT_BODY_SCHEMA>;
export type InputValue = z.infer<typeof INPUT_VALUE_SCHEMA>;
export type Input = z.infer<typeof INPUT_SCHEMA>;
