import { z } from 'zod';

export const OUTPUT_WIDGET_ID_SCHEMA = z
  .enum(['audio', 'chat', 'file', 'image', 'svg', 'video'])
  .describe('A UI component that presents output.');

export const INPUT_WIDGET_ID_SCHEMA = z
  .enum([
    'camera',
    'code',
    'css',
    'csv',
    'file',
    'form',
    'html',
    'java',
    'javascript',
    'json',
    'markdown',
    'microphone',
    'python',
    'textarea',
    'typescript',
    'xml',
    'yaml',
  ])
  .describe('A UI component that creates input.');

export const WIDGET_ID_SCHEMA = z.union([
  OUTPUT_WIDGET_ID_SCHEMA,
  INPUT_WIDGET_ID_SCHEMA,
]);

export const WIDGET_CONFIG_SCHEMA = z
  .object({})
  .describe('UI component configurations.');

export const WIDGET_CONFIG_AUDIO_SCHEMA = z
  .object({})
  .describe('Audio component configuration.');

export const WIDGET_CONFIG_AUDIO_AUTOPLAY_SCHEMA = z
  .boolean()
  .describe('Whether the audio should start playing as soon as it is ready.');

export const WIDGET_CONFIG_FORM_SCHEMA = z
  .object({})
  .describe('Form component configuration.');

export const WIDGET_CONFIG_FORM_SCHEMA_SCHEMA = z
  .any()
  .describe('JSON schema that generates and validates the component form.');

export const WIDGETS_SCHEMA = z
  .object({
    inputs: z.array(INPUT_WIDGET_ID_SCHEMA).describe('Input UI components.'),
    outputs: z.array(OUTPUT_WIDGET_ID_SCHEMA).describe('Output UI components.'),
  })
  .describe(
    'UI components for inputs and outputs. If these are not specified, they are inferred the model MIME types.',
  );

export type OutputWidgetId = z.infer<typeof OUTPUT_WIDGET_ID_SCHEMA>;
export type InputWidgetId = z.infer<typeof INPUT_WIDGET_ID_SCHEMA>;
export type WidgetId = z.infer<typeof WIDGET_ID_SCHEMA>;
export type Widgets = z.infer<typeof WIDGETS_SCHEMA>;
