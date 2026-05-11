export function injectCSS(ns : NS, file : string, id="custom-css", version="1") {
    const doc = eval("document");
    let style = doc.getElementById(id);

    const css = ns.read(file);
    if (!css) return;

    if (!style || style.getAttribute("version") !== version) {
        if (!style) {
            style = doc.createElement("style");
            style.id = id;
            doc.head.appendChild(style);
        }

        style.textContent = css;
        style.setAttribute("version", version);
    }
}
