import "./App.css";
import "../node_modules/normalize.css/normalize.css";
import PieChart from "./components/PieChart";
import Grid from "@mui/material/Grid";
import Overall from "./components/Overall";
import Today from "./components/Today";
import WeekLineChart from "./components/LineChart";
import MonthLineChart from "./components/MonthLineChart";

function App() {
	return (
		<Grid
			container
			spacing={3}
			sx={{
				padding: "50px",
			}}
		>
			<Grid item xs={3}>
				<Overall />
			</Grid>
			<Grid item xs={3}>
				<Today />
			</Grid>
			<Grid item xs={6}>
				<WeekLineChart />
			</Grid>
			<Grid item xs={8}>
				<MonthLineChart />
			</Grid>
			<Grid item xs={4}>
				<PieChart />
			</Grid>
		</Grid>
	);
}

export default App;
