import { tags, useSignal, attributes } from "@swrf/core";

const { onclick } = attributes;
const { button } = tags;

export function Counter(init = 0) {
  const count = useSignal(init);

  return button(
    onclick(() => count(count() + 1)),
    {
      style: {
        // make it a function for reactivity!
        padding: () => count() + "px", 
        fontSize: "1.5rem",
        borderRadius: "0.5rem",
      },
    },
    "Count: ",
    count
  );
}
