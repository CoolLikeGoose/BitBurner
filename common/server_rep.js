export class ServerRep {
	#ns;
	#server;

	//for easy access
	#name;
	#canHack;

	#root;
	#childs;

	/** @param {NS} ns 
	 * 	@param {name} serverName
	 * 	@param {root} serverRoot
	*/
	constructor (ns, name, root="UNDEFINED_99") {
		this.#ns = ns;
		this.#childs = [];

		this.#name = name;
		this.#root = root;
		this.#server = ns.getServer(name);
		this.#canHack = ns.getHackingLevel() > ns.getServerRequiredHackingLevel(name);

		if (!this.#server.hasAdminRights) {
			ns.exec("/tool/crack_server.js", "home", 1, name);
		}
	}

	async generateChilds() {
		let childsNames = this.#ns.scan(this.#name);
		// this.#ns.tprint("Childs raw:", childsNames);
		childsNames.forEach(async (childName) => {
			// this.#ns.tprint("Working on child:", childName);
			if (childName == this.#root) return;

			let newChild = new ServerRep(this.#ns, childName, this.#name);
			// this.#ns.tprint("Pushing child:", newChild.#name);
			this.#childs.push(newChild);
			await newChild.generateChilds();
		});
		// this.#ns.tprint("Childs com:", this.#childs.length);
	}

	async deployOnChildsR(script, scriptRAM) {
		// this.#ns.tprint("WORKING ON: ", this.#name);
		for (const child of this.#childs) {
			// check if I can do that
			// this.#ns.tprint("Checking: ", child.#name, " OF: ", this.#name);
			if (!child.#server.hasAdminRights || !child.#canHack) {
				// this.#ns.tprint("Cant hack: ", child.#name);
				await child.deployOnChildsR(script, scriptRAM);
				return;
			}
			
			// deploy
			this.#ns.killall(child.#name);
			
			// this.#ns.tprint("Hacking: ", child.#name, " OF: ", this.#name);
			// this.#ns.tprint("Deploy on: ", child.#name);
			let ramAvailable = this.#ns.getServerMaxRam(child.#name);
			let threads = Math.floor(ramAvailable / scriptRAM);

			if (threads > 0) {
				await this.#ns.scp(script, child.#name);
				await this.#ns.exec(script, child.#name, threads, child.#name);
			}

			// this.#ns.tprint("Hacking complete: ", child.#name, " OF: ", this.#name);

			//propogate
			// this.#ns.tprint("Propogaring from: ", child.#name, " TO: ", child.#childs.length);
			await child.deployOnChildsR(script, scriptRAM);
		}

		// this.#ns.tprint("DONE ON: ", this.#name);
	}

	printServersTree(level=0) {
		let hackableAmount = 0;
		let serverInfo = this.#name +
		 	"[HackLVL:" + this.#server.requiredHackingSkill + "]" + 
			"[PORTS:" + this.#server.numOpenPortsRequired + "]" + 
			"[MAXm:" + this.#ns.format.number(this.#server.moneyMax) + "]" +
			"[RAM:" + this.#server.maxRam + "]";
		this.#ns.tprint("-".repeat(level), (this.#canHack ? "✅" : "❌") + serverInfo);

		if (this.#canHack) hackableAmount++;
		if (this.#childs.length == 0) return 1;

		this.#childs.forEach((child) => {
			hackableAmount += child.printServersTree(level+1);
		});

		if (level == 0) {
			this.#ns.tprint("Hackable servers: " + hackableAmount);
		} else {
			return hackableAmount;
		}
	}
}