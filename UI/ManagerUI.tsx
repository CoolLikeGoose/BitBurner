import { RootUI } from "/UI/components/RootUI.tsx";

export function createManagerUI(ns : NS, pid : number) {
	const ids = {
		root: `ui-root-${pid}`,
		display: `ui-display-${pid}`,
		btnMain: `ui-btn-main-${pid}`,
		btnMap: `ui-btn-map-${pid}`,
		btnUpdate: `ui-btn-update-${pid}`,
		status: `ui-status-${pid}`,
	};

	let doc = null;
	let el = {};
	
	function check() {
		ns.tprint("check");
	}

	function mount() {
		ns.ui.openTail();
		ns.printRaw(<RootUI ids={ids} />);
	}

	function bind() {
		try { doc = eval("document"); } catch { return false; }

		el.display = doc.getElementById(ids.display);
		el.btnMain = doc.getElementById(ids.btnMain);
		el.btnMap = doc.getElementById(ids.btnMap);
		el.btnUpdate = doc.getElementById(ids.btnUpdate);
		el.status = doc.getElementById(ids.status);

		if (!el.display) return false;

		return true;
	}

	function updateDisplay(text) {
		if (el.display) el.display.textContent = text;
	}

	function setStatus(text) {
		if (el.status) el.status.textContent = text;
	}

	function rebind() {
		bind();
		setStatus("rebound");
	}

	function cleanup() {
		try {
			const d = eval("document");
			const root = d.getElementById(ids.root);
			if (root) root.remove();
		} catch { }
	}

	return {
		ids,
		mount,
		bind,
		updateDisplay,
		setStatus,
		rebind,
		cleanup,
		elements: el,
	};
}
