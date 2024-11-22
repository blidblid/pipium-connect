import { z } from 'zod';
import {
  LAYER_ID_SCHEMA,
  LOCAL_MODEL_ID_SCHEMA,
  MODEL_ID_SCHEMA,
  PIPE_ID_SCHEMA,
  RESULT_ID_SCHEMA,
  RUN_ID_SCHEMA,
  USER_ID_SCHEMA,
} from './common-model';
import {
  MODEL_ACCESS_SCHEMA,
  MODEL_INVITED_USER_IDS_SCHEMA,
  MODEL_NAME_SCHEMA,
  MODEL_RATE_LIMIT_LIMIT_SCHEMA,
  MODEL_RATE_LIMIT_TTL_SCHEMA,
  MODEL_SCHEMA_SCHEMA,
  MODEL_SOURCE_SCHEMA,
  MODEL_TYPES_INPUTS_SCHEMA,
  MODEL_TYPES_OUTPUT_SCHEMA,
} from './model-model';
import {
  WIDGET_CONFIG_AUDIO_AUTOPLAY_SCHEMA,
  WIDGET_CONFIG_AUDIO_SCHEMA,
  WIDGET_CONFIG_FORM_SCHEMA,
  WIDGET_CONFIG_FORM_SCHEMA_SCHEMA,
  WIDGET_CONFIG_SCHEMA,
  WidgetId,
  WIDGETS_SCHEMA,
} from './widget-model';

// Intentionally snake_casing this to follow the Python convention.

export const CONNECTION_RATE_LIMIT_SCHEMA = z
  .object({
    limit: MODEL_RATE_LIMIT_LIMIT_SCHEMA,
    ttl: MODEL_RATE_LIMIT_TTL_SCHEMA.optional(),
  })
  .describe('Rate limit configuration.');

export const CONNECTION_TYPES_SCHEMA = z
  .object({
    inputs: MODEL_TYPES_INPUTS_SCHEMA,
    output: MODEL_TYPES_OUTPUT_SCHEMA,
  })
  .describe('Input and output MIME types.');

export const CONNECTION_WIDGET_CONFIG_SCHEMA = WIDGET_CONFIG_SCHEMA.extend({
  audio: WIDGET_CONFIG_AUDIO_SCHEMA.extend({
    autoplay: WIDGET_CONFIG_AUDIO_AUTOPLAY_SCHEMA.optional(),
  }).optional(),
  form: WIDGET_CONFIG_FORM_SCHEMA.extend({
    schema: WIDGET_CONFIG_FORM_SCHEMA_SCHEMA.optional(),
  }).optional(),
} satisfies Partial<Record<WidgetId, unknown>>);

export const CONNECTION_MODEL_SCHEMA = z
  .object({
    id: MODEL_ID_SCHEMA,
    name: MODEL_NAME_SCHEMA,
    types: CONNECTION_TYPES_SCHEMA,
    invited_user_ids: MODEL_INVITED_USER_IDS_SCHEMA.optional(),
    access: MODEL_ACCESS_SCHEMA.optional(),
    schema: MODEL_SCHEMA_SCHEMA.optional(),
    widget_config: CONNECTION_WIDGET_CONFIG_SCHEMA.optional(),
    widgets: WIDGETS_SCHEMA.optional(),
    rate_limit: CONNECTION_RATE_LIMIT_SCHEMA.optional(),
  })
  .describe('Model configuration.');

export const CONNECTION_BODY_SCHEMA = z.object({
  source: MODEL_SOURCE_SCHEMA,
  models: z.array(CONNECTION_MODEL_SCHEMA),
});

export const CONNECTION_START_BODY_SCHEMA = z.object({
  id: RUN_ID_SCHEMA,
  user_id: USER_ID_SCHEMA,
  pipe_id: PIPE_ID_SCHEMA,
  model_id: MODEL_ID_SCHEMA,
  layer_id: LAYER_ID_SCHEMA,
  result_id: RESULT_ID_SCHEMA,
});

export const CONNECTION_RESULT_BODY_SCHEMA = z.object({
  id: RUN_ID_SCHEMA,
  mime_type: z.string().describe('MIME type of the result.'),
  value: z.any().describe('Value of the result.'),
  user_id: USER_ID_SCHEMA,
  pipe_id: PIPE_ID_SCHEMA,
  model_id: MODEL_ID_SCHEMA,
  layer_id: LAYER_ID_SCHEMA,
  result_id: RESULT_ID_SCHEMA,
});

export const CONNECTION_COMPLETE_BODY_SCHEMA = z.object({
  id: RUN_ID_SCHEMA,
  user_id: USER_ID_SCHEMA,
  pipe_id: PIPE_ID_SCHEMA,
  model_id: MODEL_ID_SCHEMA,
  layer_id: LAYER_ID_SCHEMA,
  result_id: RESULT_ID_SCHEMA,
});

export const CONNECTION_ERROR_BODY_SCHEMA = z.object({
  id: RUN_ID_SCHEMA,
  message: z.string().describe('Error message.'),
  user_id: USER_ID_SCHEMA,
  pipe_id: PIPE_ID_SCHEMA,
  model_id: MODEL_ID_SCHEMA,
  layer_id: LAYER_ID_SCHEMA,
  result_id: RESULT_ID_SCHEMA,
});

export const CONNECTION_PREVIOUS_VALUE_SCHEMA = z.object({
  uri: z.string().describe('URI used to download the value.'),
  description: z.string().describe('Description of the value.'),
  date: z.date().describe('Date the value was created.'),
});

export const CONNECTION_INPUT_SCHEMA = z.object({
  id: RUN_ID_SCHEMA,
  binary: z
    .union([z.instanceof(ArrayBuffer), z.instanceof(Uint8Array)])
    .describe('Binary of the input data.'),
  mime_type: z.string().describe('MIME type of the input data.'),
  user_id: USER_ID_SCHEMA,
  local_model_id: LOCAL_MODEL_ID_SCHEMA,
  pipe_id: PIPE_ID_SCHEMA,
  model_id: MODEL_ID_SCHEMA,
  result_id: RESULT_ID_SCHEMA,
  layer_id: LAYER_ID_SCHEMA,
  config: z
    .any()
    .optional()
    .describe('Configuration created from model schema.'),
  previous_values: z
    .array(CONNECTION_PREVIOUS_VALUE_SCHEMA)
    .describe('Previous values for this result_id.'),
});

export type ConnectionBody = z.infer<typeof CONNECTION_BODY_SCHEMA>;
export type ConnectionModelBody = z.infer<typeof CONNECTION_MODEL_SCHEMA>;
export type ConnectionStartBody = z.infer<typeof CONNECTION_START_BODY_SCHEMA>;
export type ConnectionResultBody = z.infer<
  typeof CONNECTION_RESULT_BODY_SCHEMA
>;
export type ConnectionCompleteBody = z.infer<
  typeof CONNECTION_COMPLETE_BODY_SCHEMA
>;
export type ConnectionErrorBody = z.infer<typeof CONNECTION_ERROR_BODY_SCHEMA>;
export type ConnectionInput = z.infer<typeof CONNECTION_INPUT_SCHEMA>;
export type ConnectionPreviousValue = z.infer<
  typeof CONNECTION_PREVIOUS_VALUE_SCHEMA
>;
export type Connection = ConnectionBody;
export type ConnectionModel = ConnectionModelBody;
export type ConnectionStart = ConnectionStartBody;
export type ConnectionResult = ConnectionResultBody;
export type ConnectionError = ConnectionErrorBody;
export type ConnectionComplete = ConnectionCompleteBody;
export type ConnectionRateLimit = z.infer<typeof CONNECTION_RATE_LIMIT_SCHEMA>;
