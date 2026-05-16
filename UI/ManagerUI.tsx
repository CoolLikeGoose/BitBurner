import { injectCSS } from "./UIHelper.tsx";
import { RootUI } from "./components/RootUI.tsx";
import { MainPage } from "./pages/MainPage.tsx";
import { MapPage } from "./pages/MapPage.tsx";
import { ScriptsPage } from "./pages/ScriptsPage.tsx";

export function createManagerUI(ns: NS, pid: number,
	serverManager: Function,
	onPageChange: Function,
	onUIEvent: Function) 
{
	injectCSS(ns, "/UI/styles/button.css.txt", "goose-bb-styles", "001");

	const ids = {
		pageContainer: `goose-ui-page-${pid}`,
		btnMain: `goose-ui-btn-main-${pid}`,
		btnMap: `goose-ui-btn-map-${pid}`,
		btnSct: `goose-ui-btn-script-${pid}`,
	};

	let doc: Document | null = null;
	let pageContainer: HTMLElement | null = null;

	const pages = {
		MAIN: MainPage(),
		MAP: MapPage(serverManager, onToastMsg),
		SCRIPTS: ScriptsPage(onUIEvent),
	};

	let currentPage = "MAIN";

	function onToastMsg(msg: string) {
		ns.toast(msg);
	}

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
		doc.getElementById(ids.btnSct).onclick = () => onPageChange("SCRIPTS");
	}

	async function renderPage(name, data) {
		currentPage = name;

		renderCurrentPage(data);
	}

	function updatePage(data) {
		pages[currentPage].update(data);
	}

	function rebind() {
		doc = eval("document");
		pageContainer = doc.getElementById(ids.pageContainer);

		bindNavbar();

		renderCurrentPage();
	}

	function renderCurrentPage(data) {
		const page = pages[currentPage];

		pageContainer.innerHTML = page.render();
		page.bind(doc);
		if (data) page.update(data);
	}

	return {
		mount,
		renderPage,
		updatePage,
		rebind,
	};
}
