import {ServerRep} from "/common/server_rep.js";
import {openUi} from "/UI/timer.tsx"

/** @param {NS} ns */
export async function main(ns) {
	// let server = new ServerRep(ns, "home");

	// await server.generateChilds();
	// server.printServersTree();
	// ns.tprint(ns.scan("iron-gym"));

	// let hackScript = "/shared/auto_hack.js";
	// await server.deployOnChildsR(hackScript, ns.getScriptRam(hackScript));

	openUi(ns);
}