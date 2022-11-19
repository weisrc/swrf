export let Document!: new () => globalThis.Document;

for (const path of require.main?.paths ?? []) {
	try {
		Document = require(path + "/linkedom/cjs/html/document.js").HTMLDocument;
		break;
	} catch {
		/* ignore */
	}
}
