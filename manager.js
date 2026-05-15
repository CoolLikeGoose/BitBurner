import { createManagerUI } from "/UI/ManagerUI.tsx";
import { createServerManager } from "/managers/ServerManager.js";
import { injectCSS } from "/UI/UIHelper.tsx";

/** @param {NS} ns **/
export async function main(ns) {
	disableLogs();
	injectCSS(ns, "/UI/styles/button.css.txt", "goose-bb-styles", "001");

	let page = "MAIN";
	let rebindUIflag = 0;
	let uiEvent = null;
	let lastData = {};

	let currentHackLvl = ns.getHackingLevel();

	const serverManager = createServerManager(ns, {currentHackLvl});
	serverManager.scanNetwork();

	const ui = createManagerUI(ns, ns.pid, serverManager,
		(newPage) => {
			page = newPage;
			ui.renderPage(page, lastData);
		},
		(event) => {
			uiEvent = event;
		});

	await ui.mount();
	attachHUDButton();

	while (true) {
		const money = Math.floor(ns.getServerMoneyAvailable("home"));
		const ramMax = ns.getServerMaxRam("home");
		const ramCurrent = ns.getServerUsedRam("home");

		lastData = { money, ramCurrent, ramMax };
		ui.updatePage(lastData);

		checkUiEvent();
		checkRebindUi();

		await ns.sleep(500);
	}

	// ============================= UI =============================
	function checkUiEvent() {
		if (uiEvent) {
			ns.toast(uiEvent.text);
			uiEvent = null;
		}
	}

	function checkRebindUi() {
		if (rebindUIflag) {
			ns.ui.openTail();
			ui.rebind();
			rebindUIflag = 0;
		}
	}

	function attachHUDButton() {
		const doc = eval("document");
		const hook = doc.getElementById("overview-extra-hook-0");
		if (!hook) return;

		hook.innerHTML = `<span id="mgr-ui-btn" class="bb-button">Manager</span>`;

		const btn = doc.getElementById("mgr-ui-btn");
		btn.onclick = () => rebindUIflag = 1;
	}

	function disableLogs() {
		const all = true;

		if (all) {
			ns.disableLog("ALL");
		} else {
			ns.disableLog("disableLog");
			ns.disableLog("sleep");
			ns.disableLog("getServerMoneyAvailable");
			ns.disableLog("getServerMaxRam");
			ns.disableLog("getServerUsedRam");
		}
	}
}
