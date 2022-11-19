export let Node!: new () => globalThis.Node;

for (const path of require.main?.paths ?? []) {
	try {
		Node = require(path + "/linkedom/cjs/interface/node.js").Node;
		break;
	} catch {
		/* ignore */
	}
}
