import { z } from 'zod';
import {
  MODEL_ID_SCHEMA,
  PIPE_ID_SCHEMA,
  USER_ID_SCHEMA,
} from './common-model';
import { MimeType } from './mime-model';
import { MODEL_SCHEMA } from './model-model';

export const LAYER_OPERATOR_SCHEMA = z
  .enum(['map', 'tap'])
  .describe(
    `The 'map'-operator makes the layer output its output value. The 'tap'-operator makes the layer output its input value without changing it.`,
  );

export const LAYER_SCHEDULER_SCHEMA = z
  .enum(['parallelize', 'queue', 'switch'])
  .describe(
    `The 'parallelize'-scheduler starts a new run in parallel with any ongoing runs. The 'queue'-scheduler queues a new run after any ongoing runs completes. The 'switch'-scheduler cancels any ongoing runs and switches to a new run.`,
  );

export const LAYER_BODY_SCHEMA = z
  .object({
    pipeId: PIPE_ID_SCHEMA,
    modelId: MODEL_ID_SCHEMA,
    config: z
      .any()
      .describe('Configuration created by the underlying model JSON schema.'),
    operator: LAYER_OPERATOR_SCHEMA,
    scheduler: LAYER_SCHEDULER_SCHEMA,
    position: z.coerce
      .number()
      .describe('Floating position of the layer in the pipe.'),
  })
  .describe('Layer body.');

export const LAYER_SCHEMA = LAYER_BODY_SCHEMA.extend({
  id: z.string(),
  userId: USER_ID_SCHEMA,
  model: MODEL_SCHEMA,
}).describe('Layer.');

export const LAYER_VALUE_BODY_SCHEMA = z
  .object({
    id: z.string().describe('Value ID.'),
    blob: z.instanceof(Blob).describe('Blob representation of the value.'),
    date: z.date().describe('Date the value was created.'),
  })
  .describe('Layer value body.');

export const LAYER_VALUE_SCHEMA = LAYER_VALUE_BODY_SCHEMA.extend({
  description: z.string().describe('Value description.'),
}).describe('Layer value.');

export type LayerBody = z.infer<typeof LAYER_BODY_SCHEMA>;
export type Layer = z.infer<typeof LAYER_SCHEMA>;
export type LayerValue = z.infer<typeof LAYER_VALUE_SCHEMA>;
export type LayerValueBody = z.infer<typeof LAYER_VALUE_BODY_SCHEMA>;
export type LayerOperator = z.infer<typeof LAYER_OPERATOR_SCHEMA>;
export type LayerScheduler = z.infer<typeof LAYER_SCHEDULER_SCHEMA>;

export interface LayerTypeError {
  layer: Layer;
  expected: MimeType[];
  actual: MimeType;
}

export interface LayerErrorMessage {
  short: string;
  long?: string;
}
