import Paper from "@mui/material/Paper";
import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import useChartDimensions from "../helpers/useChartDimensions";

const PieChart = () => {
	const [ref, dms] = useChartDimensions({});
	const [tooltipContent, setTooltipContent] = useState(null);

	const width = dms.boundedWidth;

	const chartRef = useRef();
	const [data] = useState([
		{name: "Skyrise", value: 100},
		{name: "Quantumix", value: 50},
		{name: "Stellix", value: 75},
		{name: "Fusionetics", value: 60},
	]);

	useEffect(() => {
		console.log("Pie chart parent width", width);
		const height = Math.min(width, 500);
		const radius = Math.min(width, height) / 2;
		const arc = d3
			.arc()
			.innerRadius(radius * 0.67)
			.outerRadius(radius - 1);

		const handleMouseOver = (_, d) => {
			// Calculate the position of the tooltip
			const [x, y] = arc.centroid(d);
			const tooltipX = x + width / 2;
			const tooltipY = y + height / 2;
			console.log(tooltipX);

			// Set the tooltip content based on the data
			const tooltipText = `${d.data.name}: ${d.data.value.toLocaleString(
				"en-US"
			)}`;

			// Update the state to show the tooltip
			setTooltipContent({
				text: tooltipText,
				x: tooltipX,
				y: tooltipY,
			});
		};

		const handleMouseOut = () => {
			// Clear the tooltip content when the mouse leaves the chart
			setTooltipContent(null);
		};

		const pie = d3
			.pie()
			.padAngle(1 / radius)
			.sort(null)
			.value((d) => d.value);

		const color = d3
			.scaleOrdinal()
			.domain(data.map((d) => d.name))
			.range(
				d3
					.quantize(
						(t) => d3.interpolateSpectral(t * 0.8 + 0.1),
						data.length
					)
					.reverse()
			);

		const svg = d3
			.select(chartRef.current)
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [-width / 2, -height / 2, width, height])
			.attr("style", "max-width: 100%; height: auto;");

		svg.append("g")
			.selectAll()
			.data(pie(data))
			.join("path")
			.attr("fill", (d) => color(d.data.name))
			.attr("d", arc)
			.append("title")
			.text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

		svg.append("g")
			.attr("font-family", "sans-serif")
			.attr("font-size", 12)
			.attr("text-anchor", "middle")
			.selectAll()
			.data(pie(data))
			.join("text")
			.attr("transform", (d) => `translate(${arc.centroid(d)})`)
			// .call((text) =>
			// 	text
			// 		.append("tspan")
			// 		.attr("y", "-0.4em")
			// 		.attr("font-weight", "bold")
			// 		.text((d) => d.data.name)
			// )
			.on("mouseover", (event, d) => handleMouseOver(event, d))
			.on("mouseout", handleMouseOut);

		// Create a legend
		const legend = svg
			.append("g")
			.attr("class", "legend")
			.attr("transform", `translate(${width - 50}, -45)`);

		// Add legend entries
		const legendEntries = legend
			.selectAll(".legend-entry")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "legend-entry")
			.attr("transform", (_, i) => `translate(0, ${i * 25})`);

		legendEntries
			.append("rect")
			.attr("width", 18)
			.attr("height", 18)
			.attr("fill", (_, i) => d3.schemeCategory10[i]);

		legendEntries
			.append("text")
			.attr("x", 24)
			.attr("y", 9)
			.attr("dy", "0.35em")
			.text((d) => d.name);
	}, [data, width]);

	return (
		<Paper
			sx={{
				height: "100%",
				padding: "5px 10px",
				backgroundColor: "#fff",
			}}
		>
			<p style={{fontWeight: "bold", textAlign: "center", margin: 0}}>
				Top 4 sales category
			</p>
			<p
				style={{
					fontSize: "12px",
					textAlign: "center",
					margin: 0,
					color: "#505050",
				}}
			>
				(you can view values pie onhover)
			</p>
			<div
				width="100%"
				id="pie"
				style={{display: "flex", justifyContent: "center"}}
				ref={ref}
			>
				<svg ref={chartRef}>
					{tooltipContent && (
						<div
							className="tooltip"
							style={{
								position: "absolute",
								left: `${tooltipContent.x}px`,
								top: `${tooltipContent.y}px`,
								background: "rgba(0, 0, 0, 0.8)",
								color: "white",
								padding: "5px",
								borderRadius: "5px",
							}}
						>
							{tooltipContent.text}
						</div>
					)}
				</svg>
			</div>
		</Paper>
	);
};

export default PieChart;
