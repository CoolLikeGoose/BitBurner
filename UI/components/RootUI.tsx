export function RootUI({ids}) {
	return (
		<div style={{ fontFamily: "monospace", padding: 6 }}>
			<div id={ids.pageContainer} style={{
				minHeight: "60px",
				padding: "8px",
				border: "1px solid #444",
				background: "#111"
			}}>
				Proebali...
			</div>

			<div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
				<button id={ids.btnMain} className="bb-button">MAIN</button>
				<button id={ids.btnMap} className="bb-button">MAP</button>
			</div>
		</div>
	);
}
