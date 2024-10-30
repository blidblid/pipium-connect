import { ConnectionModel } from '@pipium/model';
import { RunInput } from './run-input-model';
import { RunObserver } from './run-observer-model';
import { RunValue } from './run-value-model';

/**
 * A single Connection to Pipium, containing run functions and any `ConnectionModel` configuration.
 */
export interface Connection extends Omit<ConnectionModel, 'id'> {
  /**
   * Run function that returns one or more values.
   *
   * @param input Input data for the run, containing input binary data, configuration and previous values for this run.
   * @returns One or more `RunValue`, such as binary data or plain text.
   */
  run_sync?: (
    input: RunInput,
  ) => RunValue | RunValue[] | Promise<RunValue | RunValue[]>;

  /**
   * Run function that emits values, errors and completion notifications.
   *
   * @param input Input data for the run, containing input binary data, configuration and previous values for this run.
   * @param observer Observer for the run, containing methods to emit values, errors and completion notifications.
   */
  run_async?: (input: RunInput, observer: RunObserver) => unknown;
}
