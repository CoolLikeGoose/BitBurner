import { RootUI } from "./components/RootUI.tsx";
import { MainPage } from "./pages/MainPage.tsx";
import { MapPage } from "./pages/MapPage.tsx";

export function createManagerUI(ns: NS, pid: number, onPageChange: Function) {
	const ids = {
		pageContainer: `goose-ui-page-${pid}`,
		btnMain: `goose-ui-btn-main-${pid}`,
		btnMap: `goose-ui-btn-map-${pid}`,
	};

	let doc: Document | null = null;
	let pageContainer: HTMLElement | null = null;

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
