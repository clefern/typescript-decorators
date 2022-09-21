export interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAllData(): T;
  set(update: T): void;
}
