import { getType } from "../browser/utils";
import { Readable } from "../types";

export let read = <T>(x: Readable<T>): T =>
  getType(x)[0] == "f" ? (x as any)() : x;
