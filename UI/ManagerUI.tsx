import { RootUI } from "/UI/components/RootUI.tsx";
import { MainPage } from "/UI/pages/MainPage.tsx";
import { MapPage } from "/UI/pages/MapPage.tsx";

export function createManagerUI(ns, pid, onPageChange) {
	const ids = {
		root: `ui-root-${pid}`,
		pageContainer: `ui-page-${pid}`,
		navbar: `ui-navbar-${pid}`,
		btnMain: `ui-btn-main-${pid}`,
		btnMap: `ui-btn-map-${pid}`,
		btnUpdate: `ui-btn-update-${pid}`,
		status: `ui-status-${pid}`,
	};

	let doc = null;
	let pageContainer = null;

	const pages = {
		MAIN: MainPage(),
		MAP: MapPage(),
	};

	let currentPage = "MAIN";

	async function mount() {
		ns.ui.openTail();
		ns.printRaw(<RootUI ids={ids} />);
		await ns.sleep(0);
		
		doc = eval("document");
		pageContainer = doc.getElementById(ids.pageContainer);

		bindNavbar();
		await renderPage(currentPage, {});
	}

	function bindNavbar() {
		doc.getElementById(ids.btnMain).onclick = () => onPageChange("MAIN");
		doc.getElementById(ids.btnMap).onclick = () => onPageChange("MAP");
		doc.getElementById(ids.btnUpdate).onclick = () => rebind();
	}

	async function renderPage(name, data) {
		currentPage = name;

		const page = pages[name];

		pageContainer.innerHTML = "";
		pageContainer.appendChild(page.render());

		await ns.sleep(0);
		page.bind(doc);
		page.update(data);
	}

	function updatePage(data) {
		pages[currentPage].update(data);
	}

	function rebind() {
		doc = eval("document");
		bindNavbar();
		pages[currentPage].bind(doc);
	}

	return {
		mount,
		renderPage,
		updatePage,
		rebind,
	};
}
