import { Output } from './output-model';

/**
 * An observer contains callbacks that handle the three possible outcomes of a run:
 * - next: the run has produced a value
 * - error: the run has produced an error and stopped
 * - complete: the run has completed and will not produce any more values
 */
export interface Observer {
  next: (value: Output) => void;
  error: (message: string) => void;
  complete: () => void;
}
