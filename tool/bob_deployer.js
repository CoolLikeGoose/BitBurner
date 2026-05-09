/** @param {NS} ns */
export async function main(ns) {
	// let ramAvailable = 32768; //19b
	// let ramAvailable = 65536; //49b
	// let ramAvailable = 131072; //129b
	// let ramAvailable = 262144;  //335b
	// let ramAvailable = 524288;  //873.366b
	let ramAvailable = 1048576;  //2.271t
	let name = "BOB-"+ns.args[0];
	let script = "/shared/auto_hack.js"

	if (!ns.serverExists(name)) {
		let needMon = ns.cloud.getServerCost(ramAvailable);
		if (needMon > ns.getServerMoneyAvailable("home")) {
			ns.tprint("Cant purchase server need: " + ns.format.number(ns.cloud.getServerCost(ramAvailable)));
			return;
		}
		ns.cloud.purchaseServer(name, ramAvailable);
		ns.scp(script, name);
	}

	ns.killall(name);
	let threads = Math.floor(ramAvailable / ns.getScriptRam(script));
	await ns.exec(script, name, threads, ns.args[1]);
}