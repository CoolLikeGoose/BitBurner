export function BarDisplay(id: string, label : string) {
	let el: HTMLElement | null = null;

	let barNum = 20;
	let fullBarSeg = '|';
	let emptyBarSeg = '-';

	return {
		id,

		render() {
			return `<div id="${id}">${label}: ...</div>`;
		},

		bind(root: Document) {
			el = root.getElementById(id);
		},

		update(value: number, valueMax: number) {
			if (!el) return;

			let perc10 = valueMax/barNum;
			let curFull = value/perc10;
			el.innerHTML = `${label}: [${fullBarSeg.repeat(curFull)}${emptyBarSeg.repeat(barNum-curFull)}]`;
		},
	}
}