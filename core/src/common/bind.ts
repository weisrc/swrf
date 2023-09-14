import type { WritableSignal } from "../types";

export let bind = (
  event: keyof GlobalEventHandlersEventMap,
  value: WritableSignal<string>
) => ({
  value,
  ["$" + event]: (e: Event) =>
    value((e.currentTarget as HTMLInputElement)?.value)
});
