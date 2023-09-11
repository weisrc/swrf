export let observer = () => {};

export let effect = (fn: () => void, node?: Node) => {
  let startup = true;
  let current = () => {
    let previous = observer;
    observer = current;
    if (startup || (node?.isConnected ?? true)) {
      fn();
    }
    observer = previous;
  };
  current();
  startup = false;
  if (node) {
    node.addEventListener("mount", current as any);
    node.addEventListener("unmount", current as any);
  }
};
