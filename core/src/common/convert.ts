import type { WritableSignal } from "../types";

export let toString =
  (signal: WritableSignal<number>): WritableSignal<string> =>
  (...args) =>
    (args.length ? signal(+args[0]!) : signal()) + "";

export let toNumber =
  (signal: WritableSignal<string>): WritableSignal<number> =>
  (...args) =>
    +(args.length ? signal(args[0] + "") : signal());
