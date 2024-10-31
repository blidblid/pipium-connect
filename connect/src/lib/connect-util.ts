export function omit_object_properties<T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}

export function is_promise<T>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}
