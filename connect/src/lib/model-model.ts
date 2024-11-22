import { ConnectionModel } from '@pipium/model';
import { Input } from './input-model';
import { Observer } from './observer-model';
import { Output } from './output-model';

/**
 * A Pipium model, containing run functions and any configuration.
 */
export interface Model extends Omit<ConnectionModel, 'id'> {
  /**
   * Run function that returns one or more values.
   *
   * @param input Input data for the run, containing input binary data, configuration and previous values for this run.
   * @returns One or more `RunValue`, such as binary data or plain text.
   */
  run_sync?: (input: Input) => Output | Output[] | Promise<Output | Output[]>;

  /**
   * Run function that emits values, errors and completion notifications.
   *
   * @param input Input data for the run, containing input binary data, configuration and previous values for this run.
   * @param observer Observer for the run, containing methods to emit values, errors and completion notifications.
   */
  run_async?: (input: Input, observer: Observer) => unknown;
}
