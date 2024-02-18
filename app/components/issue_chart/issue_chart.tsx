"use client";

// Recharts
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Types
interface Props {
	open: number;
	in_progress: number;
	closed: number;
}

const Issue_chart = (Props: Props) => {
	const data = [
		{
			label: "Open",
			value: Props.open,
		},
		{
			label: "In Progress",
			value: Props.in_progress,
		},
		{
			label: "Closed",
			value: Props.closed,
		},
	];

	return (
		<>
			<div className="pt-8">
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
