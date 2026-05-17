import { findAllContracts } from "./contract_finder.js";
import { solveContract } from "./contract_solver.js";

/** @param {NS} ns **/
export async function main(ns) {
	disableLogs();
	const stopOnFail = false;
	const stopOnUnknow = false;

	ns.ui.openTail();
	ns.print(`INFO \nStop on fail: ${stopOnFail}\nStop on unknow contract type: ${stopOnUnknow}`);

	const contracts = findAllContracts(ns);
	const contractsNumber = contracts.length;
	ns.print(`Found ${contractsNumber} contracts.`);

	let solvedCount = 0;
	let unknownContracts = [];
	let errorContracts = [];
	for (const c of contracts) {
		const type = ns.codingcontract.getContractType(c.file, c.host);
		const data = ns.codingcontract.getData(c.file, c.host);

		const answer = solveContract(ns, type, data);

		if (answer == null) {
			ns.print(`WARN Unknown contract: ${type} on ${c.host}(${c.file})`);
			unknownContracts.push(type);

			if (stopOnUnknow) {
				return;
			}
			continue;
		}

		const result = ns.codingcontract.attempt(answer, c.file, c.host);

		if (result) {
			solvedCount++;
			ns.print(`SUCCESS ${result}`);
		} else {
			ns.print(`ERROR Failed ${type} on ${c.host}`);
			errorContracts.push(type);
		}

		await ns.sleep(10);
	}

	ns.print(`Solved ${solvedCount}/${contractsNumber}`);
	if (unknownContracts.length > 0) {
		ns.print(`Unknown contracts:`);
		for (c of unknownContracts) {
			ns.print(c);
		}
	}
	if (errorContracts.length > 0) {
		ns.print(`Error in contracts:`);
		for (c of errorContracts) {
			ns.print(c);
		}
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