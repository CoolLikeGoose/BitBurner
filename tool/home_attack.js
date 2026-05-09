/** @param {NS} ns */
export async function main(ns) {
	let ramAvailable = ns.getServerMaxRam("home")-500;
	//  ns.getServerUsedRam("home");
	let ramNeeded = ns.getScriptRam("shared/auto_hack.js");

	let threads = Math.floor(ramAvailable / ramNeeded);
	ns.exec("shared/auto_hack.js", "home", threads, ns.args[0]);
}