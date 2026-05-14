export function createServerManager(ns) {
	const servers = {}; // hostname -> serverInfo

	function scanNetwork() {
		servers["home"] = makeServerInfo("home", null);
		buildTree("home", null);
		buildConnectChains();
	}

	function makeServerInfo(host, parent) {
		const s = ns.getServer(host);

		return {
			host,
			parent,
			children: [],
			hasRoot: s.hasAdminRights,
			connectChain: [],
			attractiveness: 0,
		};
	}

	function buildTree(host, parent) {
		const neighbors = ns.scan(host);

		for (const n of neighbors) {
			if (n === parent) continue;

			servers[n] = makeServerInfo(n, host);
			servers[host].children.push(n);

			buildTree(n, host);
		}
	}

	function buildConnectChains() {
		for (const host in servers) {
			servers[host].connectChain = buildChain(host);
		}
	}

	function buildChain(host) {
		const chain = [];
		let cur = host;

		while (cur !== null) {
			chain.unshift(cur);
			cur = servers[cur].parent;
		}

		return chain;
	}

	function getTree() {
		return servers;
	}

	function getConnectCommand(host) {
		return servers[host].connectChain
			.map(h => (h === "home" ? "home" : `connect ${h}`))
			.join("; ");
	}

	return {
		scanNetwork,
		getTree,
		getConnectCommand,
		servers,
	};
}
