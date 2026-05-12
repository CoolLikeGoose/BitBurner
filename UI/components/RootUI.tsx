export function RootUI(ids) {
	return (
		<div id={ids.root} style={{ fontFamily: "monospace", padding: 6 }}>
			<div id={ids.pageContainer} style={{
				minHeight: "60px",
				padding: "8px",
				border: "1px solid #444",
				background: "#111"
			}}>
				Proebali...
			</div>

			<div id={ids.navbar} style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
				<button id={ids.btnMain} className="bb-button">MAIN</button>
				<button id={ids.btnMap} className="bb-button">MAP</button>
				<button id={ids.btnUpdate} className="bb-button">UPDATE UI</button>
			</div>

			<div id={ids.status} style={{ marginLeft: "auto" }}>status</div>
		</div>
	);
}
