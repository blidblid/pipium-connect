export type InputWidgetId =
  | 'camera'
  | 'code'
  | 'css'
  | 'csv'
  | 'file'
  | 'form'
  | 'html'
  | 'java'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'microphone'
  | 'python'
  | 'textarea'
  | 'typescript'
  | 'xml'
  | 'yaml';

export type OutputWidgetId =
  | 'file'
  | 'audio'
  | 'chat'
  | 'image'
  | 'svg'
  | 'video';

/** UI components for inputs and outputs. */
export interface Widgets {
  /** Input UI components. */
  inputs: InputWidgetId[];

  /** Output UI components. */
  outputs: OutputWidgetId[];
}
