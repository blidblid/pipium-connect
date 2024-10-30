import { ConnectionInput, ConnectionPreviousValue } from '@pipium/model';

export interface RunInput extends ConnectionInput {
  text: string;
  previous_values: RunPreviousValue[];
}

export interface RunPreviousValue extends ConnectionPreviousValue {
  text(): Promise<string>;
  binary(): Promise<ArrayBuffer>;
}
