// ---------------------------------------------------------------------------
// Shadow DOM patching (kept nodes keep their focus, hover and running animations)
// ---------------------------------------------------------------------------

// The tank is animated: rewriting the whole card on every update of Home Assistant would restart every fish and
// every bubble several times a second. The new HTML is patched into the old one instead, node by node.
export const patchAttrs = (cur, next) => {
  for (const { name } of [...cur.attributes]) if (!next.hasAttribute(name)) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
};
export const keyOf = (n) => (n.nodeType === 1 ? n.getAttribute("data-key") : null);
export const sameNode = (a, b) => !!a && a.nodeType === b.nodeType && a.nodeName === b.nodeName;
export const patchChildren = (cur, next) => {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = keyOf(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = keyOf(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!sameNode(o, n) || used.has(o) || (k === null && keyOf(o) !== null) || (k !== null && keyOf(o) !== k)) o = null;
    const ref = cur.childNodes[i] ?? null;
    if (!o) {
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType === 1) {
      patchAttrs(o, n);
      patchChildren(o, n);
    } else if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
};
// Patches the shadow root with `html`; without a DOM (unit tests), the HTML is set as is.
export const morph = (root, html) => {
  const tpl = typeof document !== "undefined" ? document.createElement("template") : null;
  if (!tpl?.content || !root.childNodes) {
    root.innerHTML = html;
    return;
  }
  tpl.innerHTML = html;
  patchChildren(root, tpl.content);
};
