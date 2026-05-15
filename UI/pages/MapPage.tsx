export function MapPage(serverManager, onServerClick) {
	let doc: Document | null = null;

	return {
		render() {
			const tree = serverManager.getTree();
			return `<div>${renderNode("home", tree, 0, [])}</div>`;
		},

		bind(root: Document) {
			doc = root;

			const tree = serverManager.getTree();
			bindNode("home", tree);
		},

		update(value: any) { }
	};

	function renderNode(host, tree, level, isLastArr) {
		const server = tree[host];
		let color = "#F44336";
		if (server.isHackable) {
			color = "#4CAF50";
		} else if (server.hasRoot) {
			color = "#f4be36ff";
		}

		let prefix = "";
		for (let i = 0; i < level - 1; i++) {
			prefix += isLastArr[i] ? "  " : "│ ";
		}

		if (level > 0) {
			prefix += isLastArr[level - 1] ? "└─ " : "├─ ";
		}

		const cmd = server.connectChain
			.map(h => (h === "home" ? "home" : `connect ${h}`))
			.join("; ");

		let html = "";
		html += `<div id="map-${host}" ">`;
		html += `${prefix}<a style="color:${color}; cursor:pointer; text-decoration:none" href="javascript:navigator.clipboard.writeText('${cmd}')">${host}</a>`;
		html += `</div>`;

		const children = server.children;
		const lastIndex = children.length - 1;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const isLast = i === lastIndex;
			html += renderNode(child, tree, level + 1, [...isLastArr, isLast]);
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
