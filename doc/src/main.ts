import {
  arraySignal,
  attributes,
  bind,
  For,
  render,
  Show,
  signal,
  tags
} from "@swrf/core";

const { div, button, h1, input } = tags;
const { onclick, onmount, ref, onunmount } = attributes;

const App = () => {
  const showList = signal(false);
  const array = arraySignal(new Array(1).fill(0).map(() => signal("")));

  const buttonRef = signal<HTMLButtonElement>();

  const forOut = For(array, (v, i) => {
    return div(
      onmount(() => console.log("mounted")),
      onunmount(() => console.log("unmounted")),
      i,
      input(bind("input", v)),
      v,
      input({ placeholder: "placeholder" }),
      button(
        onclick(() => {
          array.splice(i(), 1);
        }),
        "remove"
      ),
      Show(
        () => v().startsWith("0"),
        div(
          {
            style: {
              color: "red",
              fontWeight: "bold"
            }
          },
          "starts with 0"
        )
      )
    );
  });

  return div(
    onmount(() => console.log("mounted 2")),
    h1("Hello World!"),
    button(
      ref(buttonRef),
      onclick(() => {
        array.unshift(signal(""));
      }),
      "add"
    ),
    button(
      onclick(() => {
        showList(!showList());
      }),
      "toggle"
    ),
    Show(showList, forOut()),
    "some text here"
  );
};

render(App, document.getElementById("app")!);
