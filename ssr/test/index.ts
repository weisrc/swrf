import {
  attributes,
  bindEvent,
  tags,
  For,
  useSignal,
  Signal,
  toString
} from "@swrf/core";
import { render } from "../src";

const { button, div, br, input } = tags;
const { onclick, style } = attributes;

function counter() {
  const array = useSignal<Signal<string>[]>(
    Array(10)
      .fill(0)
      .map((_, i) => useSignal(i + " data"))
  );
  const text = useSignal("");
  const index = useSignal(0);
  const red = style({ color: "red" });

  const add = () => {
    array().splice(index(), 0, useSignal(text() || Math.random().toFixed(2)));
    array([...array()]);
  };

  const remove = () => {
    array().splice(index(), 1);
    array([...array()]);
  };

  const shuffle = () => {
    array([...array()].sort(() => Math.random() - 0.5).reverse());
    console.log(array().map((x) => x()));
  };

  const out = div(
    input({ type: "number" }, bindEvent("input", toString(index))),
    input(bindEvent("input", text)),
    button(onclick(add), "add"),
    button(onclick(remove), red, "remove"),
    button(onclick(shuffle), "shuffle"),
    br(),
    For(array, (n) => {
      return div(
        "value=",
        n,
        input(bindEvent("input", n)),
        button(
          onclick(() => array(array().filter((x) => x !== n))),
          red,
          "remove"
        )
      );
    })
  );
  return out;
}

const start = performance.now();
render(() => counter()).then((out) => {
  console.log(performance.now() - start);
  console.log(out.outerHTML);
});
