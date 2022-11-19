import { Ref } from "./types";
export declare const into: (ref: Ref<string>) => (e: Event) => string;
export declare const bind: (value: Ref<string>) => {
    value: Ref<string>;
    oninput: (e: Event) => string;
};
