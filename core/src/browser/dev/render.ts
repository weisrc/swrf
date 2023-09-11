import { render as _render } from "..";

export let DEV = {
  SWRF_RENDER: () => {
    console.warn("Use of render function required for hot module reloads.");
  }
};

let rendered = false;

export let isHMR = false;
export let iterators: Record<string, number> = {};
export let recoveredSignalsCount = 0;

export let increaseRecoveredRefCount = () => recoveredSignalsCount++;

export let render: typeof _render = (fn, root) => {
  if (rendered) isHMR = true;
  iterators = {};
  recoveredSignalsCount = 0;
  DEV.SWRF_RENDER = () => {
    root.innerHTML = "";
    _render(fn, root);
  };
  DEV.SWRF_RENDER();
  if (isHMR) {
    console.log(
      `🌊 swrf hot reload 🔥 (${recoveredSignalsCount} signals recovered)`
    );
  }
  isHMR = false;
  rendered = true;
};
