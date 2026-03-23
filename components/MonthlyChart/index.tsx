"use client"

import { Button } from "@/components/ui/button"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer
} from "recharts"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart"

export interface MonthlyDataPoint {
	month: string
	value: number
}

interface MonthlyChartProps {
	title: string
	data: MonthlyDataPoint[]
	footerLabel: string
	onFooterClick?: () => void
	barColor?: string
	className?: string
}

const CHART_CONFIG = {
	value: { label: "Valor", color: "#ffa300" }
} satisfies ChartConfig

const MonthlyChart = ({
	title,
	data,
	footerLabel,
	onFooterClick,
	barColor = "#ffa300",
	className = ""
}: MonthlyChartProps) => {
	return (
		<div className={`flex flex-col border border-default-border-color rounded-md py-5 px-6 h-full ${className}`}>
			<h2 className="section-title mb-3">{title}</h2>

			<div className="flex-1 flex items-end min-h-0">
				<ChartContainer config={CHART_CONFIG} className="w-full h-72">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} barCategoryGap="15%">
							<CartesianGrid
								vertical={false}
								strokeDasharray="3 3"
								stroke="#333"
							/>
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tick={{ fill: "#9ca3af", fontSize: 13, fontWeight: 500 }}
								dy={6}
							/>
							<YAxis hide />
							<ChartTooltip
								content={<ChartTooltipContent />}
								cursor={{ fill: "rgba(255,163,0,0.08)" }}
							/>
							<Bar
								dataKey="value"
								fill={barColor}
								radius={[4, 4, 0, 0]}
								maxBarSize={36}
							/>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</div>

			<div className="flex justify-center pt-4">
				<Button
					variant="outline"
					size="sm"
					className="px-5 py-2.5 cursor-pointer text-sm gap-2"
					onClick={onFooterClick}
				>
					<RiGitRepositoryCommitsFill size={16} />
					{footerLabel}
				</Button>
			</div>
		</div>
	)
}

export default MonthlyChart
