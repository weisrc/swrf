import type { WritableSignal } from "../types";

export const toString =
  (signal: WritableSignal<number>): WritableSignal<string> =>
  (...args) =>
    (args.length ? signal(+args[0]!) : signal()) + "";

export const toNumber =
  (signal: WritableSignal<string>): WritableSignal<number> =>
  (...args) =>
    +(args.length ? signal(args[0] + "") : signal());
