import { ConnectionPreviousValue } from '@pipium/model';

export interface PreviousValue extends ConnectionPreviousValue {
  /**
   * Get the text value of the previous value.
   */
  text(): Promise<string>;

  /**
   * Get the JSON value of the previous value.
   */
  json(): Promise<unknown>;

  /**
   * Get the binary value of the previous value.
   */
  binary(): Promise<ArrayBuffer>;
}
