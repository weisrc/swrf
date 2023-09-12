import type { WritableSignal } from "../types";

export let toString = (
  signal: WritableSignal<number>
): WritableSignal<string> =>
  ((...args: any[]) =>
    (args.length ? signal(+args[0]!) : signal()) + "") as any;

export let toNumber = (
  signal: WritableSignal<string>
): WritableSignal<number> =>
  ((...args: any[]) => +(args.length ? signal(args[0] + "") : signal())) as any;
