import { render as _render } from "../render";
export declare const DEV: {
    SWRF_RENDER: () => void;
};
export declare let isHMR: boolean;
export declare let iterators: Record<string, number>;
export declare let recoveredRefCount: number;
export declare const increaseRecoveredRefCount: () => number;
export declare const render: typeof _render;
