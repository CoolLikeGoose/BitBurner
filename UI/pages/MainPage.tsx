import { TextDisplay } from "../components/TextDisplay.tsx";
import { BarDisplay } from "../components/BarDisplay.tsx";

export function MainPage() {
	const money = TextDisplay("gs-money", "Money");
	const ramBar = BarDisplay("gs-ramHome", "HOME RAM");

	const components = { money, ramBar };

	return {
		components,

		render() {
			return `<div>${money.render()}${ramBar.render()}</div>`;
		},


		bind(root: Document) {
			money.bind(root);
			ramBar.bind(root);
		},

		update(data: any) {
			if (data.money !== undefined) money.update(data.money);
			if (data.ramCurrent !== undefined) ramBar.update(data.ramCurrent, data.ramMax);
		}
	};
}
