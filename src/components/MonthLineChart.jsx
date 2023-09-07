import Paper from "@mui/material/Paper";
import {useEffect, useState, useRef} from "react";
import * as d3 from "d3";
const colors = [
	"#ea5545",
	"#f46a9b",
	"#ef9b20",
	"#edbf33",
	"#ede15b",
	"#bdcf32",
	"#87bc45",
	"#27aeef",
	"#b33dc6",
];

const MonthLineChart = () => {
	const [data] = useState([
		{date: new Date("2021-09-01"), close: 175},
		{date: new Date("2021-10-01"), close: 211},
		{date: new Date("2021-11-01"), close: 162},
		{date: new Date("2021-12-01"), close: 190},
		{date: new Date("2022-01-01"), close: 197},
		{date: new Date("2022-02-01"), close: 182},
		{date: new Date("2022-03-01"), close: 284},
		{date: new Date("2022-04-01"), close: 263},
		{date: new Date("2022-05-01"), close: 278},
		{date: new Date("2022-06-01"), close: 306},
		{date: new Date("2022-07-01"), close: 249},
		{date: new Date("2022-08-01"), close: 327},
		{date: new Date("2022-09-01"), close: 292},
		{date: new Date("2022-10-01"), close: 255},
		{date: new Date("2022-11-01"), close: 320},
		{date: new Date("2022-12-01"), close: 298},
		{date: new Date("2023-01-01"), close: 154},
		{date: new Date("2023-02-01"), close: 313},
		{date: new Date("2023-03-01"), close: 226},
		{date: new Date("2023-04-01"), close: 232},
		{date: new Date("2023-05-01"), close: 241},
		{date: new Date("2023-06-01"), close: 168},
		{date: new Date("2023-07-01"), close: 320},
		{date: new Date("2023-08-01"), close: 150},
		{date: new Date("2023-09-01"), close: 345},
	]);

	const [data2] = useState([
		{date: new Date("2021-09-01"), close: 220},
		{date: new Date("2021-10-01"), close: 310},
		{date: new Date("2021-11-01"), close: 175},
		{date: new Date("2021-12-01"), close: 260},
		{date: new Date("2022-01-01"), close: 188},
		{date: new Date("2022-02-01"), close: 320},
		{date: new Date("2022-03-01"), close: 210},
		{date: new Date("2022-04-01"), close: 265},
		{date: new Date("2022-05-01"), close: 275},
		{date: new Date("2022-06-01"), close: 230},
		{date: new Date("2022-07-01"), close: 245},
		{date: new Date("2022-08-01"), close: 295},
		{date: new Date("2022-09-01"), close: 330},
		{date: new Date("2022-10-01"), close: 280},
		{date: new Date("2022-11-01"), close: 300},
		{date: new Date("2022-12-01"), close: 260},
		{date: new Date("2023-01-01"), close: 225},
		{date: new Date("2023-02-01"), close: 280},
		{date: new Date("2023-03-01"), close: 260},
		{date: new Date("2023-04-01"), close: 310},
		{date: new Date("2023-05-01"), close: 190},
		{date: new Date("2023-06-01"), close: 265},
		{date: new Date("2023-07-01"), close: 230},
		{date: new Date("2023-08-01"), close: 275},
		{date: new Date("2023-09-01"), close: 310},
	]);

	const ref = useRef();

	useEffect(() => {
		const width = 1100;
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
			.attr(
				"style",
				"max-width: 100%; height: auto; height: intrinsic; font: 10px;"
			)
			.style("-webkit-tap-highlight-color", "transparent")
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
					.ticks(36)
					.tickSizeOuter(0)
					.tickFormat((d, i) => {
						return i % 3 === 0 ? d3.timeFormat("%Y-%m-%d")(d) : "";
					})
			)
			.attr("class", "x-text")
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
					.text("Years summary")
			);
		svg.selectAll("text").attr("fill", "#101010");

		// Append a path for the line.
		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", colors[0])
			.attr("stroke-width", 1.5)
			.attr("d", line(data));

		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "rgb(66, 136, 181)")
			.attr("stroke-width", 1.5)
			.attr("d", line(data2));

		svg.selectAll(".dot")
			.data(data.concat(data2))
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => x(d.date))
			.attr("cy", (d) => y(d.close))
			.attr("r", 3.5) // Adjust the radius of the dots as needed
			.style("fill", colors[0]); // Dot color

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
			tooltip.attr("transform", `translate(${width - 400},${15})`);
			tooltip
				.selectAll("text")
				.data([,])
				.join("text")
				.call((text) =>
					text
						.selectAll("tspan")
						.data([
							`${formatDate(data[i].date)} - 
              Shop 1: ${formatValue(data[i].close)}
              Shop 2:${formatValue(data2[i].close)}`,
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
	}, [data, data2]);

	return (
		<Paper
			sx={{
				padding: "10px",
				backgroundColor: "#fff",
				height: "100%",
			}}
		>
			<svg ref={ref}></svg>
		</Paper>
	);
};

export default MonthLineChart;
