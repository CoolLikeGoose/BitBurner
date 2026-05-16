import { solveContract } from "./contract_solver.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.ui.openTail();

	const type = "Minimum Path Sum in a Triangle";
	const server = "n00dles";
	const repeat = 100;
	const testCase = null;

	if (testCase) {
		oneShotTest();
		return;
	}

	let solvedCount = 0;
	ns.print(`Starting.\nSolving ${repeat} contracts of type ${type}`);
	for (let i = 0; i < repeat; i++) {
		const cName = ns.codingcontract.createDummyContract(type, server);
		if (!cName) {
			ns.print("ERROR Failed to create contract;");
			i--;
			continue;
		}

		const data = ns.codingcontract.getData(cName, server);
		const answer = solveContract(ns, type, data);

		if (answer == null) {
			ns.print(`WARN FUCK?`);
			continue;
		}

		const result = ns.codingcontract.attempt(answer, cName, server);

		if (result) {
			solvedCount++;
		} else {
			ns.print(`ERROR Failed`);
		}

		await ns.sleep(5);
	}

	const prefix = solvedCount === repeat ? "SUCCESS" : "ERROR";
	ns.print(`${prefix} solved ${solvedCount}/${repeat}`);

	function oneShotTest() {
		const test = solveContract(ns, type, testCase);
		ns.print(`Out: ${test}`);
	}
}