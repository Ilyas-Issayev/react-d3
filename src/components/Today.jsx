import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Today = () => {
	return (
		<Grid
			sx={{
				height: "100%",
				width: "100%",
			}}
			container
		>
			<Grid
				item
				xs={6}
				sx={{
					height: "50%",
					paddingBottom: "10px",
					paddingRight: "10px",
				}}
			>
				<Paper
					sx={{
						height: "100%",
						position: "relative",
					}}
				>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							position: "absolute",
							top: "35%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						Order
					</p>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							fontSize: "2.7em",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "rgb(66, 136, 181)",
						}}
					>
						155K
					</p>
				</Paper>
			</Grid>
			<Grid item xs={6} sx={{height: "50%", paddingBottom: "10px"}}>
				<Paper
					sx={{
						height: "100%",
						position: "relative",
					}}
				>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							position: "absolute",
							top: "35%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "100%",
						}}
					>
						Gross Profit
					</p>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							fontSize: "2.7em",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "rgb(66, 136, 181)",
						}}
					>
						1.2KK
					</p>
				</Paper>
			</Grid>
			<Grid item xs={6} sx={{height: "50%", paddingRight: "10px"}}>
				<Paper
					sx={{
						height: "100%",
						position: "relative",
					}}
				>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							position: "absolute",
							top: "35%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						Sold
					</p>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							fontSize: "2.7em",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "rgb(66, 136, 181)",
						}}
					>
						18.3K
					</p>
				</Paper>
			</Grid>
			<Grid item xs={6} sx={{height: "50%"}}>
				<Paper
					sx={{
						height: "100%",
						position: "relative",
					}}
				>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							position: "absolute",
							top: "35%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "100%",
						}}
					>
						Daily Average
					</p>
					<p
						style={{
							margin: 0,
							textAlign: "center",
							paddingTop: "10px",
							fontSize: "1.7em",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: "rgb(66, 136, 181)",
						}}
					>
						$1,096.30
					</p>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Today;
