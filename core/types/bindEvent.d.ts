import { Signal } from "./types";
export declare const bindEvent: (event: keyof GlobalEventHandlersEventMap, signal: Signal<string>) => {
    [x: string]: Signal<string> | ((e: Event) => string);
    value: Signal<string>;
};
