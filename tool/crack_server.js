/** @param {NS} ns */
export async function main(ns) {
	let target = ns.args[0];
	let targetPortsNeed = ns.getServerNumPortsRequired(target);
	let portsOpened = 0;

	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(target);
		portsOpened++;
	}

	if (ns.fileExists("FTPCrack.exe", "home")) {
		ns.ftpcrack(target);
		portsOpened++;
	}

	if (ns.fileExists("relaySMTP.exe", "home")) {
		ns.relaysmtp(target);
		portsOpened++;
	}

	if (ns.fileExists("HTTPWorm.exe", "home")) {
		ns.httpworm(target);
		portsOpened++;
	}

	if (ns.fileExists("SQLInject.exe", "home")) {
		ns.sqlinject(target);
		portsOpened++;
	}

	if (portsOpened < targetPortsNeed) {
		return;
	}

	ns.nuke(target);

	ns.tprint("Nuke complete on " + target + ".");
}