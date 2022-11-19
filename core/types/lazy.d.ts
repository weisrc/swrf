import { Child, Fun } from "./types";
export declare const lazy: <T extends {
    default: (...args: any[]) => Child;
}>(fn: () => Promise<T>) => (...args: Parameters<T["default"]>) => Fun<Child>;
