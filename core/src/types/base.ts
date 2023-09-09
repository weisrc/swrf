export type Signal<T> = () => T;
export type Lazy<T> = () => T;
export type WritableSignal<T> = (value?: T, force?: boolean) => T;
export type Readable<T> = T | Signal<T>;
