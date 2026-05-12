export function TextDisplay(id: string, label: string) {
	let el: HTMLElement | null = null;

	return {
		id,

		render() {
			return `<div id="${id}">${label}: ...</div>`;
		},

		bind(root: Document) {
			el = root.getElementById(id);
		},

		update(value: any) {
			if (el) el.innerText = `${label}: ${value}`;
		}
	};
}
