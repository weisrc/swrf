import {
  attributes,
  render,
  tags,
  useSignal,
  For,
  bind,
  useEffect
} from "@swrf/core";

const { div, button, h1, input } = tags;
const { onclick, onmount } = attributes;

const App = () => {
  const array = useSignal(new Array(3).fill(0).map(() => useSignal("")));

  return div(
    onmount(() => console.log("mounted 2")),
    h1("Hello World!"),
    button(
      onclick(() => {
        array([...array(), useSignal("")]);
      }),
      "add"
    ),
    For(array, (v, i) => {
      return div(
        i,
        input(bind("input", v)),
        v,
        button(
          onclick(() => {
            array().splice(i(), 1);
            array([...array()]);
          }),
          "remove"
        )
      );
    })
  );
};

render(App(), document.getElementById("app")!);
