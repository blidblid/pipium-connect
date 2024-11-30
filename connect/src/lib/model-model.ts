import { Input } from './input-model';
import { Observer } from './observer-model';
import { Output } from './output-model';
import { RateLimit } from './rate-limit-model';
import { Types } from './types-model';
import { WidgetConfig } from './widget-config-model';
import { Widgets } from './widgets-model';

export type Access = 'public' | 'private';

/**
 * A Pipium model, containing run functions and any configuration.
 *
 * `T` - Input configuration type.
 */
export interface Model<T = any> {
  /** Model name. */
  name: string;

  /** Input and output MIME types. */
  types: Types;

  /**
   * Run function that returns one or more values.
   *
   * @param input Input data for the run, containing input data, configuration and previous values for this run.
   * @returns One or more `Output`, such as binary data or plain text.
   */
  run_sync?: (
    input: Input<T>,
  ) => Output | Output[] | Promise<Output | Output[]>;

  /**
   * Run function that emits values, errors and completion notifications.
   *
   * @param input Input data for the run, containing input data, configuration and previous values for this run.
   * @param observer Observer for the run, containing methods to emit values, errors and completion notifications.
   */
  run_async?: (input: Input<T>, observer: Observer) => unknown;

  /** Invited user IDs that are allowed to run the model. */
  invited_user_ids?: string[];

  /** Model access control. Public models are accessible by anyone. Private models are only accessible by the owner and invited users. */
  access?: Access;

  /** JSON schema that validates config and generates a form. */
  schema?: Record<string, unknown>;

  /** Model description. */
  description?: string;

  /** Rate limit configuration. */
  rate_limit?: RateLimit;

  /** UI components for inputs and outputs. If unspecified, they are inferred the model MIME types. */
  widgets?: Widgets;

  /** UI component configurations. */
  widget_config?: WidgetConfig;
}
