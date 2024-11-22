import { ConnectionInput } from '@pipium/model';
import { PreviousValue } from './previous-value-model';

export interface Input extends ConnectionInput {
  /**
   * Text value of the input.
   */
  text: string;

  /**
   * Previous values for this run.
   */
  previous_values: PreviousValue[];
}
