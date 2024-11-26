import { PreviousValue } from './previous-value-model';

/**
 * Input to the model.
 *
 * `T` - Configuration type.
 */
export interface Input<T = any> {
  /** Input ID. */
  id: string;

  /** Input value as binary data. */
  binary: ArrayBuffer;

  /** Input value as text. */
  text: string;

  /** Input MIME type. */
  mime_type: string;

  /** User ID. */
  user_id: string;

  /** Local model ID. */
  local_model_id: string;

  /** Pipe ID. */
  pipe_id: string;

  /** Model ID. */
  model_id: string;

  /** Result ID. */
  result_id: string;

  /** Layer ID. */
  layer_id: string;

  /** Input configuration from the model JSON Schema. */
  config: T;

  /**
   * Previous values for this run.
   */
  previous_values: PreviousValue[];
}
