export function MapPage(serverManager, onServerClick) {
	let doc: Document | null = null;

	return {
		render() {
			const tree = serverManager.getTree();
			return `<div>${renderNode("home", tree, 0)}</div>`;
		},

		bind(root: Document) {
			doc = root;

			const tree = serverManager.getTree();
			bindNode("home", tree);
		},

		update(value: any) { }
	};

	function renderNode(host, tree, level) {
		const server = tree[host];
		const color = server.hasRoot ? "#4CAF50" : "#F44336";
		const prefix = level === 0 ? "" : "│ ".repeat(level - 1) + "├─ ";

		const cmd = server.connectChain
			.map(h => (h === "home" ? "home" : `connect ${h}`))
			.join("; ");

		let html = "";
		html += `<div id="map-${host}" ">`;
		html += `${prefix}<a style="color:${color}; cursor:pointer; text-decoration:none" href="javascript:navigator.clipboard.writeText('${cmd}')">${host}</a>`;
		html += `</div>`;

		for (const child of server.children) {
			html += renderNode(child, tree, level + 1);
		}

		return html;
	}

	function bindNode(host, tree) {
		const el = doc.getElementById(`map-${host}`);
		if (!el) return;

		el.onclick = () => {
			onServerClick({
				text: `Copied: ${host}`,
			});
		};

		for (const child of tree[host].children) {
			bindNode(child, tree);
		}
	}
}
