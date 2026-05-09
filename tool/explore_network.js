import {ServerRep} from "/common/server_rep.js";

/** param {NS} ns */
export async function main(ns) {
	let server = new ServerRep(ns, "home");
	// ns.tprint(JSON.stringify(server));
	await server.generateChilds();
	await server.printServersTree();
}