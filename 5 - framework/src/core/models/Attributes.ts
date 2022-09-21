export class Attributes<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data ? this.data[key] : null!;
  }

  getAllData(): T {
    return { ...this.data };
  }

  set(update: T): void {
    this.data = {
      ...this.data,
      ...update,
    };
  }
}
