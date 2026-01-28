"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", total: 1200 },
  { month: "Fev", total: 2100 },
  { month: "Mar", total: 1400 },
  { month: "Abr", total: 2400 },
  { month: "Mai", total: 1000 },
  { month: "Jun", total: 1100 },
  { month: "Jul", total: 2500 },
  { month: "Ago", total: 2300 },
  { month: "Set", total: 800 },
  { month: "Out", total: 1900 },
  { month: "Nov", total: 1200 },
  { month: "Dez", total: 2600 },
]

const chartConfig = {
  total: {
    label: "Valor Total: R$ ",
    color: "var(--color-default-orange)", 
  },
} satisfies ChartConfig

export const FinanceChart = () => {
    return (
        <ChartContainer config={chartConfig} className="min-h-62.5 w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fill: "#888", fontSize: 12 }} // Cor cinza para os meses
                />
                
                <ChartTooltip 
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                    content={<ChartTooltipContent hideLabel indicator="line" />} 
                />
                
                <Bar 
                    dataKey="total" 
                    fill="var(--color-default-orange)" 
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    )
}

export default FinanceChart