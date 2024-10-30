import { JSONSchema7 } from 'json-schema';

export type Schema = JSONSchema7 & {
  properties?: Record<string, Schema>;
  items?: Schema;
  enum?: string[];
  required?: string[];
};

export type SchemaValue =
  | string
  | number
  | boolean
  | null
  | {
      [key: string]: SchemaValue;
    }
  | SchemaValue[];

export type SchemaType<T extends JSONSchema7> = T['type'] extends 'boolean'
  ? boolean
  : T['type'] extends 'string'
    ? string
    : T['type'] extends 'number' | 'integer'
      ? number
      : T['type'] extends 'array'
        ? (T['items'] extends JSONSchema7 ? SchemaType<T['items']> : unknown)[]
        : T['type'] extends 'object'
          ? T['properties'] extends JSONSchema7
            ? SchemaType<T['properties']>
            : unknown
          : unknown;
