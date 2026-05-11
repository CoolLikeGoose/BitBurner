import { createManagerUI } from "/UI/ManagerUI.tsx";
import { injectCSS } from "/UI/UIHelper.tsx";

/** @param {NS} ns **/
export async function main(ns) {
	disableLogs();
	injectCSS(ns, "/UI/styles/button.css.txt", "gbb-styles-custom", "001");

	const ui = createManagerUI(ns, ns.pid);

	ui.mount();
	await ns.sleep(0);
	ui.bind();
	ui.setStatus("ready");

	ns.atExit(ui.cleanup);

	let page = "MAIN";
	let prevMoney = -1;

	while (true) {
		const money = Math.floor(ns.getServerMoneyAvailable("home"));

		if (money !== prevMoney) {
			if (page === "MAIN") {
				ui.updateDisplay(`MAIN\nMoney: ${money}`);
			} else if (page === "MAP") {
				ui.updateDisplay("MAP\nTest1\nTest2\nTest3");
			}
			prevMoney = money;
		}

		// кнопки
		const el = ui.elements;
		if (el.btnMain) el.btnMain.onclick = () => { page = "MAIN"; };
		if (el.btnMap) el.btnMap.onclick = () => { page = "MAP"; };
		if (el.btnUpdate) el.btnUpdate.onclick = () => ui.rebind();

		await ns.sleep(500);
	}

	function disableLogs() {
		ns.disableLog("disableLog");
		ns.disableLog("sleep");
		ns.disableLog("getServerMoneyAvailable");
	}
}
