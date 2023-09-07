import Paper from "@mui/material/Paper";
import Gauge from "./Gauge";

const Overall = () => {
	return (
		<Paper
			sx={{
				height: "100%",
				padding: "10px",
				backgroundColor: "#fff",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Gauge
				max={10000}
				min={0}
				value={7532}
				label={"Weekly Sales"}
				units={""}
			/>
		</Paper>
	);
};

export default Overall;
