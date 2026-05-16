/** @param {NS} ns */
export function findAllContracts(ns) {
	const servers = scanAllServers(ns);
	const contracts = [];

	for (const host of servers) {
		const files = ns.ls(host, ".cct");
		for (const file of files) {
			contracts.push({host, file});
		}
	}

	return contracts;
}

function scanAllServers(ns) {
	const visited = new Set(["home"]);
	const stack = ["home"];

	while (stack.length > 0) {
		const host = stack.pop();
		for (const n of ns.scan(host)) {
			if (!visited.has(n)) {
				visited.add(n);
				stack.push(n);
			}
		}
	}

	return [...visited];
}