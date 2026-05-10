export function getButtonStyle() {
	return {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		userSelect: "none",
		fontFamily: 'JetBrainsMono, "Courier New", monospace',
		fontWeight: 500,
		fontSize: "0.875rem",
		lineHeight: 1.75,
		minWidth: "64px",
		color: "rgb(155, 155, 255)",
		backgroundColor: "rgb(35, 35, 55)",
		padding: "6px 8px",
		border: "1px solid rgb(17, 17, 17)",
		marginRight: "8px",
		transition: "background-color 250ms ease, color 250ms ease",
	};
}