import z from 'zod';
import { MODEL_ID_SCHEMA, USER_ID_SCHEMA } from './common-model';
import { MIME_TYPE_SCHEMA } from './mime-model';
import {
  WIDGET_CONFIG_AUDIO_AUTOPLAY_SCHEMA,
  WIDGET_CONFIG_AUDIO_SCHEMA,
  WIDGET_CONFIG_FORM_SCHEMA,
  WIDGET_CONFIG_FORM_SCHEMA_SCHEMA,
  WIDGET_CONFIG_SCHEMA,
  WidgetId,
  WIDGETS_SCHEMA,
} from './widget-model';

export const MODEL_ACCESS_SCHEMA = z
  .enum(['public', 'private', 'forbidden'])
  .describe(
    'Model access control. Public models are accessible by anyone. Private models are only accessible by the owner and invited users. Forbidden models are not accessible by anyone.',
  );

export const MODEL_SOURCE_SCHEMA = z.enum(['browser', 'user']);
export const MODEL_NAME_SCHEMA = z.string().describe('Model name.');
export const MODEL_SCHEMA_SCHEMA = z
  .any()
  .describe('JSON schema that validates config and generates a form.');

export const MODEL_INVITED_USER_IDS_SCHEMA = z
  .array(z.string())
  .describe('Invited user IDs that are allowed to run the model.');

export const MODEL_TYPES_INPUTS_SCHEMA = z
  .array(MIME_TYPE_SCHEMA)
  .describe(
    'Input MIME types. These are the types this model accepts as input.',
  );

export const MODEL_TYPES_OUTPUT_SCHEMA = MIME_TYPE_SCHEMA.describe(
  'Input MIME types. This is the type this model produces as output.',
);

export const MODEL_TYPES_SCHEMA = z.object({
  inputs: MODEL_TYPES_INPUTS_SCHEMA,
  output: MODEL_TYPES_OUTPUT_SCHEMA,
});

export const MODEL_WIDGET_CONFIG_SCHEMA = WIDGET_CONFIG_SCHEMA.extend({
  audio: WIDGET_CONFIG_AUDIO_SCHEMA.extend({
    autoplay: WIDGET_CONFIG_AUDIO_AUTOPLAY_SCHEMA.optional(),
  }).optional(),
  form: WIDGET_CONFIG_FORM_SCHEMA.extend({
    schema: WIDGET_CONFIG_FORM_SCHEMA_SCHEMA.optional(),
  }).optional(),
} satisfies Partial<Record<WidgetId, unknown>>);

export const MODEL_RATE_LIMIT_LIMIT_SCHEMA = z
  .number()
  .positive()
  .describe('Maximum number of allowed requests.');

export const MODEL_RATE_LIMIT_TTL_SCHEMA = z
  .number()
  .describe('Milliseconds until a request is removed from the limit count.');

export const MODEL_RATE_LIMIT_SCHEMA = z
  .object({
    limit: MODEL_RATE_LIMIT_LIMIT_SCHEMA,
    ttl: MODEL_RATE_LIMIT_TTL_SCHEMA.optional(),
  })
  .describe('Rate limit configuration.');

export const MODEL_BODY_SCHEMA = z.object({
  userId: USER_ID_SCHEMA,
  connectionModelId: z.string(),
  source: MODEL_SOURCE_SCHEMA,
  name: MODEL_NAME_SCHEMA,
  types: MODEL_TYPES_SCHEMA,
  invitedUserIds: MODEL_INVITED_USER_IDS_SCHEMA.optional(),
  access: MODEL_ACCESS_SCHEMA.optional(),
  rateLimit: MODEL_RATE_LIMIT_SCHEMA.optional(),
  schema: MODEL_SCHEMA_SCHEMA.optional(),
  widgets: WIDGETS_SCHEMA.optional(),
  widgetConfig: MODEL_WIDGET_CONFIG_SCHEMA.optional(),
});

export const MODEL_SCHEMA = MODEL_BODY_SCHEMA.extend({
  id: MODEL_ID_SCHEMA,
  date: z.date().describe('Creation date.'),
}).required({
  access: true,
  invitedUserIds: true,
  widgets: true,
});

export type ModelBody = z.infer<typeof MODEL_BODY_SCHEMA>;
export type Model = z.infer<typeof MODEL_SCHEMA>;
export type ModelTypes = z.infer<typeof MODEL_TYPES_SCHEMA>;
export type ModelAccess = z.infer<typeof MODEL_ACCESS_SCHEMA>;
export type ModelSource = z.infer<typeof MODEL_SOURCE_SCHEMA>;
export type ModelWidgetConfig = z.infer<typeof MODEL_WIDGET_CONFIG_SCHEMA>;
export type ModelRateLimit = z.infer<typeof MODEL_RATE_LIMIT_SCHEMA>;
export type ModelWidgetConfigType<T extends WidgetId> =
  T extends keyof ModelWidgetConfig ? ModelWidgetConfig[T] : never;
