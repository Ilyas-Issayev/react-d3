import Paper from "@mui/material/Paper";
import {useEffect, useState, useRef} from "react";
import * as d3 from "d3";

const WeekLineChart = () => {
	const [data] = useState([
		{date: new Date("2023-08-02"), close: 243},
		{date: new Date("2023-08-03"), close: 176},
		{date: new Date("2023-08-04"), close: 285},
		{date: new Date("2023-08-05"), close: 234},
		{date: new Date("2023-08-06"), close: 132},
		{date: new Date("2023-08-07"), close: 297},
		{date: new Date("2023-08-08"), close: 168},
		{date: new Date("2023-08-09"), close: 215},
		{date: new Date("2023-08-10"), close: 266},
		{date: new Date("2023-08-11"), close: 118},
		{date: new Date("2023-08-12"), close: 188},
		{date: new Date("2023-08-13"), close: 289},
		{date: new Date("2023-08-14"), close: 127},
		{date: new Date("2023-08-15"), close: 163},
		{date: new Date("2023-08-16"), close: 241},
		{date: new Date("2023-08-17"), close: 214},
		{date: new Date("2023-08-18"), close: 229},
		{date: new Date("2023-08-19"), close: 195},
		{date: new Date("2023-08-20"), close: 202},
		{date: new Date("2023-08-21"), close: 172},
		{date: new Date("2023-08-22"), close: 285},
		{date: new Date("2023-08-23"), close: 258},
		{date: new Date("2023-08-24"), close: 194},
		{date: new Date("2023-08-25"), close: 233},
		{date: new Date("2023-08-26"), close: 197},
		{date: new Date("2023-08-27"), close: 210},
		{date: new Date("2023-08-28"), close: 265},
		{date: new Date("2023-08-29"), close: 134},
		{date: new Date("2023-08-30"), close: 141},
		{date: new Date("2023-08-31"), close: 293},
	]);

	const ref = useRef();

	useEffect(() => {
		const width = 928;
		const height = 500;
		const marginTop = 20;
		const marginRight = 30;
		const marginBottom = 30;
		const marginLeft = 40;

		// Declare the x (horizontal position) scale.
		const x = d3.scaleUtc(
			d3.extent(data, (d) => d.date),
			[marginLeft, width - marginRight]
		);

		// Declare the y (vertical position) scale.
		const y = d3.scaleLinear(
			[0, d3.max(data, (d) => d.close)],
			[height - marginBottom, marginTop]
		);

		// Declare the line generator.
		const line = d3
			.line()
			.x((d) => x(d.date))
			.y((d) => y(d.close));

		// Create the SVG container.
		const svg = d3
			.select(ref.current)
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width, height])
			.attr("style", "max-width: 100%; height: auto; height: intrinsic;")
			.style("overflow", "visible")
			.on("pointerenter pointermove", pointermoved)
			.on("pointerleave", pointerleft)
			.on("touchstart", (event) => event.preventDefault());

		// Add the x-axis.
		svg.append("g")
			.attr("transform", `translate(0,${height - marginBottom})`)
			.call(
				d3
					.axisBottom(x)
					.ticks(width / 80)
					.tickSizeOuter(0)
			)
			.selectAll("line")
			.attr("stroke", "#101010");

		// Add the y-axis, remove the domain line, add grid lines and a label.
		svg.append("g")
			.attr("transform", `translate(${marginLeft},0)`)
			.call(d3.axisLeft(y).ticks(height / 100))
			.call((g) => g.select(".domain").remove())
			.call((g) =>
				g
					.selectAll(".tick line")
					.clone()
					.attr("x2", width - marginLeft - marginRight)
					.attr("stroke-opacity", 0.1)
					.attr("stroke", "#101010")
			)
			.call((g) =>
				g
					.append("text")
					.attr("x", -marginLeft)
					.attr("y", 20)
					.attr("text-anchor", "start")
					.attr("class", "month-report")
					.text("Month report")
			);
		svg.selectAll("text").attr("fill", "#101010");

		// Append a path for the line.
		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr("d", line(data));

		const tooltip = svg.append("g");

		function formatValue(value) {
			return value.toLocaleString("en", {
				style: "currency",
				currency: "USD",
			});
		}

		const formatDate = d3.utcFormat("%B %d, %Y");

		const bisect = d3.bisector((d) => d.date).center;
		function pointermoved(event) {
			const i = bisect(data, x.invert(d3.pointer(event)[0]));
			tooltip.style("display", null);
			tooltip.attr("transform", `translate(${width - 275},${15})`);
			tooltip
				.selectAll("text")
				.data([,])
				.join("text")
				.call((text) =>
					text
						.selectAll("tspan")
						.data([
							`${formatDate(data[i].date)} - 
              Shop 1: ${formatValue(data[i].close)}`,
						])
						.join("tspan")
						.attr("x", 0)
						.attr("y", (_, i) => `${i * 1.1}em`)
						.attr("fill", "#101010")
						.text((d) => d)
				);
		}

		function pointerleft() {
			tooltip.style("display", "none");
		}
	}, [data]);

	return (
		<Paper
			sx={{
				height: "100%",
				padding: "10px",
				backgroundColor: "#fff",
			}}
		>
			<svg ref={ref}></svg>
		</Paper>
	);
};

export default WeekLineChart;
