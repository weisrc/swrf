import { WritableSignal } from "./types";

export const bindEvent = (
  event: keyof GlobalEventHandlersEventMap,
  signal: WritableSignal<string>
) => ({
  value: signal,
  ["on" + event]: (e: Event) =>
    signal((e.currentTarget as HTMLInputElement)?.value)
});
