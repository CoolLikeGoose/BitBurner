import { createManagerUI } from "/UI/ManagerUI.tsx";
import { injectCSS } from "/UI/UIHelper.tsx";

/** @param {NS} ns **/
export async function main(ns) {
    disableLogs();
    injectCSS(ns, "/UI/styles/button.css.txt", "goose-bb-styles", "001");

    let page = "MAIN";
    let updateUIflag = 0;
    let lastData = {};
		
    const ui = createManagerUI(ns, ns.pid, (newPage) => {
        page = newPage;
        ui.renderPage(page, lastData);
    });

    await ui.mount();
    attachHUDButton();

    while (true) {
        const money = Math.floor(ns.getServerMoneyAvailable("home"));
        const ram = ns.getServerMaxRam("home");

        lastData = { money, ram };
        ui.updatePage(lastData);

        if (updateUIflag) {
            ns.ui.openTail();
            ui.rebind();
            updateUIflag = 0;
        }

        await ns.sleep(500);
    }

    function attachHUDButton() {
        const doc = eval("document");
        const hook = doc.getElementById("overview-extra-hook-0");
        if (!hook) return;

        hook.innerHTML = `<span id="mgr-ui-btn" class="bb-button">Manager UI</span>`;

        const btn = doc.getElementById("mgr-ui-btn");
        btn.onclick = () => updateUIflag = 1;
    }

    function disableLogs() {
        ns.disableLog("disableLog");
        ns.disableLog("sleep");
        ns.disableLog("getServerMoneyAvailable");
    }
}
