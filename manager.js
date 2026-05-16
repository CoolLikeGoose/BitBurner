import { createManagerUI } from "/UI/ManagerUI.tsx";
import { createServerManager } from "/managers/ServerManager.js";

import { scriptsData } from "/common/scripts_data.js";

/** @param {NS} ns **/
export async function main(ns) {
	disableLogs();

	// UI vars
	let page = "MAIN";
	let uiEvent = null;
	let lastData = {};

	let currentHackLvl = ns.getHackingLevel();

	const serverManager = createServerManager(ns, { currentHackLvl });
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

		await ns.asleep(500);
	}

	// ============================= UI =============================
	function checkUiEvent() {
		if (!uiEvent) return;

		if (uiEvent.head == "RUN") {
			runScript(uiEvent.data);
		} 
		
		uiEvent = null;
	}

	function runScript(name) {
		const file = scriptsData[name].file;
		ns.run(file);
	}

	function attachHUDButton() {
		const doc = eval("document");
		const hook = doc.getElementById("overview-extra-hook-0");
		if (!hook) return;

		hook.innerHTML = `<span id="mgr-ui-btn" class="bb-button">Manager</span>`;

		const btn = doc.getElementById("mgr-ui-btn");
		btn.onclick = () => {
			ns.ui.openTail();
			ui.rebind();
		};
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
