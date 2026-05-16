import { Button } from "../components/Button.tsx";

export function ScriptsPage(onUIEvent: Function) {
	const solvecontractsBtn = Button("gs-solveallcontracts", "Solve Contracts", () => {
		onUIEvent({head: "RUN", data: "solvecontracts"})
	});

	const components = { solvecontractsBtn };

	return {
		components,

		render() {
			return `<div>${solvecontractsBtn.render()}</div>`;
		},


		bind(root: Document) {
			solvecontractsBtn.bind(root);
		},

		update(data: any) {  }
	};
}