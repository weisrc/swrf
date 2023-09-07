# 🌊 Swrf 🏖️

_Speedy Web Reactive Functions_

- Pronouced as **surf**, /sərf/
- Truly **reactive**
- We love **functions**
- 90% **tree-shakeable**
- All in one **Ethernet frame**

## Start Swrfing!

```sh
npm i @swrf/core
```

```ts
import { tags, attributes } from "@swrf/core";
const { button } = tags;
const { onclick } = attributes;
function counter() {
  const count = ref(0);
  const increment = () => count(count() + 1);
  return button(onclick(increment), "count=", count);
}
render();
```

Or using JSX with transpiler magic:

```tsx
/* @jsx h */
import { h } from "@swrf/core";
function Counter() {
  const count = ref(0);
  const increment = () => count(count() + 1);
  return <button onclick={increment}>count={count}</button>;
}
```

## Bundle Sizes

```
vite v3.2.7 building for production...
✓ 14 modules transformed.
dist/swrf.es.js   3.76 KiB / gzip: 1.47 KiB
dist/swrf.cjs.js   2.72 KiB / gzip: 1.29 KiB
dist/swrf.umd.js   2.79 KiB / gzip: 1.37 KiB
dist/swrf.iife.js   2.62 KiB / gzip: 1.30 KiB
vite v3.2.7 building for dev...
✓ 17 modules transformed.
dist/swrf-dev.es.js   4.13 KiB / gzip: 1.65 KiB
vite v3.2.7 building for slim...
✓ 9 modules transformed.
dist/swrf-slim.es.js   2.25 KiB / gzip: 0.91 KiB
dist/swrf-slim.cjs.js   1.54 KiB / gzip: 0.79 KiB
dist/swrf-slim.umd.js   1.70 KiB / gzip: 0.88 KiB
dist/swrf-slim.iife.js   1.53 KiB / gzip: 0.80 KiB
```

## Overview

- `ref` is base of this library
- `fx` observes changes in refs called synchronously within it

```ts
import { ref, fx } from "@swrf/core";
const count = ref(0); // initial value of 0
fx(() => {
  console.log("count=", count()); // prints count=0
});
count(10); // prints count=10
count(count() + 1); // prints count=11
```

- `Get` is a union type of the value or a function that returns the value

- `get` gets the value from a `Get`

```ts
const count = ref(0); // this extends a Get, so...
console.log(get(count)); // prints 0
```

- `h` is a mostly hyperscript compatible function that creates reactive elements
  - attributes are `Get<Record<string, Get>>`
    - `style` can be `string | Record<string, Get<string>>`
    - `classList` is `Record<string, Get<boolean>>`, if true include in list, otherwise, exclude
  - children are `Get<Node>`

```ts
import { h } from "@swrf/core";
const color = ref("red");
const div = h("div", { style: { color } }, "I am red");
```

- `map` maps over `Get<any[]>` returning a `Fragment` and updates the children efficiently according to changes in the provided array

- `render` is not 100% needed as `h` returns `HTMLElement`. However, it does enable some HMR features.

## Hot Reload

This library has somewhat of a hot reload module feature, but it is limited.

- Only refs are kept, everything else is reloaded
- Rerenders even unaffected elements
- Needs render-time deterministic components (no `Math.random`)

However, on the bright side:

- No transpiler magic
- No plugins, only need `import.meta.hot.accept(() => {})` next to `render`.

## 🚧 Under development, PRs are welcomed!

- Unit + Integration Testing
- Better docs
- Optimize even more for size and speed (leaner code)
- Finish SSR + Vite plugin `@swrf/ssr`
- Server-side real-time refs
- Smarter HMR without transforms
- GitHub actions
- Better README with badges
- Test using webpack (now only vite is supported)

## Contribute

Please :)

- Monorepo using npm
- Tests
- Thank you!

## License

MIT. Wei (weisrc)
