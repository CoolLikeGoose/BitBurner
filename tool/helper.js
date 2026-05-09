/** @param {NS} ns */
export async function main(ns) {
	// let ramAvailable = 524288;

	// ns.cloud.purchaseServer("TEST-1", ramAvailable);
	// ns.scp("shared/share.js", "TEST-1");

	// let threads = Math.floor(ramAvailable / ns.getScriptRam("shared/share.js"));
	// ns.exec("shared/share.js", "TEST-1", threads);
	
	ns.tprint(ns.heart.break());
	ns.tprint(ns.getPlayer().numPeopleKilled);

	// let ramAvailable = ns.getServerMaxRam("home")-ns.getServerUsedRam("home");
	// let ramNeeded = ns.getScriptRam("/shared/stupid_grow.js");

	// let threads = Math.floor(ramAvailable / ramNeeded);
	// ns.exec("shared/stupid_grow.js", "home", threads, ns.args[0]);
}