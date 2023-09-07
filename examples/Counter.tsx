/* @jsx h */
import { h, useEffect, useSignal } from "@swrf/core";

declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number };
  }
}

export function Counter(init = 0) {
  const count = useSignal(init);
  return <foo />;
}
