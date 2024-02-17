"use client";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Issue_chart = () => {
	const data = [
		{
			label: "open",
			value: 8,
		},
		{
			label: "in_progress",
			value: 6,
		},
		{
			label: "closed",
			value: 5,
		},
	];

	return (
		<>
			<div className="pt-4">
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<XAxis dataKey="label"></XAxis>
						<YAxis></YAxis>
						<Bar
							dataKey="value"
							barSize={60}
							style={{ fill: "var(--accent-9)" }}
						></Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default Issue_chart;
