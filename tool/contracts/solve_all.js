import { findAllContracts } from "./contract_finder.js";
import { solveContract } from "./contract_solver.js";

/** @param {NS} ns **/
export async function main(ns) {
	disableLogs();
	const stopOnFail = true;
	const stopOnUnknow = true;

	ns.ui.openTail();
	ns.print(`INFO \nStop on fail: ${stopOnFail}\nStop on unknow contract type: ${stopOnUnknow}`);

	const contracts = findAllContracts(ns);
	ns.print(`Found ${contracts.length} contracts.`);

	for (const c of contracts) {
		const type = ns.codingcontract.getContractType(c.file, c.host);
		const data = ns.codingcontract.getData(c.file, c.host);

		const answer = solveContract(ns, type, data);

		if (answer == null) {
			ns.print(`WARN Unknown contract: ${type} on ${c.host}(${c.file})`);
			if (stopOnUnknow) {
				return;
			} 
			continue;
		}

		const result = ns.codingcontract.attempt(answer, c.file, c.host);

		if (result) {
			ns.print(`SUCCESS Solved ${type} on ${c.host}: ${result}`);
		} else {
			ns.print(`ERROR Failed ${type} on ${c.host}`);
		}

		await ns.sleep(10);
	}

	function disableLogs() {
		const all = true;

		if (all) {
			ns.disableLog("ALL");
		} else {
			ns.disableLog("disableLog");
			ns.disableLog("scan");
		}
	}
}