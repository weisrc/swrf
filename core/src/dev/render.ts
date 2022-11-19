import { render as _render } from "../render";

export const DEV = {
	SWRF_RENDER: () => {
		console.warn("Use of render function required for hot module reloads.");
	},
};

let rendered = false;

export let isHMR = false;
export let iterators: Record<string, number> = {};
export let recoveredRefCount = 0;

export const increaseRecoveredRefCount = () => recoveredRefCount++;

export const render: typeof _render = (fn, root) => {
	if (rendered) isHMR = true;
	iterators = {};
	recoveredRefCount = 0;
	DEV.SWRF_RENDER = () => {
		root.innerHTML = "";
		_render(fn, root);
	};
	DEV.SWRF_RENDER();
	if (isHMR) {
		console.log(`🌊 swrf hot reload 🔥 (${recoveredRefCount} refs recovered)`);
	}
	isHMR = false;
	rendered = true;
};
