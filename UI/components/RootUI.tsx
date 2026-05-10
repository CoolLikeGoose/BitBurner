import { getButtonStyle } from "/UI/styles.tsx";

export function RootUI({ ids }) {
	const btn_style = getButtonStyle();

	return (
		<div id={ids.root} style={{ fontFamily: "monospace", padding: 6 }}>
			<div id={ids.display} style={{
				minHeight: "60px",
				padding: "8px",
				border: "1px solid #444",
				background: "#111"
			}}>
				Initializing...
			</div>

			<div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
				<button id={ids.btnMain} style={btn_style}>MAIN</button>
				<button id={ids.btnMap} style={btn_style}>MAP</button>
				<button id={ids.btnUpdate} style={btn_style}>UPDATE UI</button>

				<div id={ids.status} style={{ marginLeft: "auto" }}>status</div>
			</div>
		</div>
	);
}
