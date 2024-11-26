/** A previous value for the current run. */
export interface PreviousValue {
  /** URI of the previous value used to download it. */
  uri: string;

  /** Description of the previous value. */
  description: string;

  /** Date the previous value was created. */
  date: Date;

  /**
   * Gets the text value of the previous value.
   */
  text(): Promise<string>;

  /**
   * Gets the JSON value of the previous value.
   */
  json(): Promise<unknown>;

  /**
   * Gets the binary value of the previous value.
   */
  binary(): Promise<ArrayBuffer>;
}
