import {
  arraySignal,
  attributes,
  bind,
  effect,
  For,
  render,
  Show,
  signal,
  tags
} from "@swrf/core";

const { div, button, h1, input } = tags;
const { onclick, $mount, ref, $unmount } = attributes;

const App = () => {
  const showList = signal(false);
  const array = arraySignal(new Array(1).fill(0).map(() => signal("")));

  effect(() => {
    console.log("effect", showList());
  });

  const buttonRef = signal<HTMLButtonElement>();

  const forOut = For(array, (v, i) => {
    return div(
      $mount(() => console.log("mounted")),
      $unmount(() => console.log("unmounted")),
      i,
      input(bind("input", v)),
      v,
      input({ placeholder: "placeholder" }),
      button(
        onclick(() => {
          return () => array.splice(i(), 1);
        }),
        {
          onclick: () => () => array.splice(i(), 1)
        },
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
    $mount(() => console.log("mounted 2")),
    h1("Hello World!"),
    button(
      ref(buttonRef),
      onclick(() => {
        return () => array.unshift(signal(""));
      }),
      "add"
    ),
    button(
      onclick(() => {
        return () => showList(!showList());
      }),
      "toggle"
    ),
    Show(showList, forOut()),
    "some text here"
  );
};

render(App, document.getElementById("app")!);
