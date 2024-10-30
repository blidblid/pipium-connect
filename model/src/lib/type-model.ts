import { Observable } from 'rxjs';

export type PickRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type PickOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];
export type PromiseValue<T> = T extends Promise<infer U> ? U : T;
export type ObservableValue<T> = T extends Observable<infer U> ? U : T;
export type ArrayValue<T> = T extends Array<infer U> ? U : T;

export type Map<T, Find, Replace> = T extends (infer V)[]
  ? Map<V, Find, Replace>[]
  : T extends object
    ? { [K in keyof T]: Map<T[K], Find, Replace> }
    : T extends Find
      ? Replace
      : T;
