import { solveContract } from "./contract_solver.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.ui.openTail();

	const type = "Sanitize Parentheses in Expression";
	const server = "n00dles";
	const repeat = 115;
	const printDetailed = false;
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
			if (printDetailed) {
				ns.print(`SUCCESS Solved`);
				ns.print(`\tInput was: ${data}`)
				ns.print(`\tAnswer was: ${answer}`)
			}
			solvedCount++;
		} else {
			if (printDetailed) {
				ns.print(`ERROR Failed`);
				ns.print(`\tInput was: ${data}`)
				ns.print(`\tAnswer was: ${answer}`)
			}
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