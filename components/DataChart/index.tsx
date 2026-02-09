"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useEffect, useState } from "react"

// const chartData = [{ sex: "male", quantity: 275, fill: "var(--chart-1)" }, { sex: "female", quantity: 90, fill: "var(--chart-5)" }]

const chartConfig = {
    quantity: { label: "Quantidade" }, male: { label: "Masculino", color: "var(--chart-1)" }, female: { label: "Feminino", color: "var(--chart-5)" }
} satisfies ChartConfig

const DataChart = ({ children, isBorder = false, datas }: { children: string, isBorder?: boolean, datas: object[] }) => {
    const [chartData, setChartData] = useState<object[]>([])

    useEffect(() => {
        const counts: Record<string, number> = {}

        datas.forEach((sex) => {
            counts[sex] = (counts[sex] || 0) + 1
        })

        const newChartData = Object.entries(counts).map(([sex, quantity]) => ({ sex, quantity, fill: sex === "FEMALE" ? "var(--chart-5)" : "var(--chart-1)" }))
        setChartData(newChartData)
    }, [datas])

    console.log(chartData)

    return (
        <Card className={`bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 ${isBorder && "border-r"}`}>
            <CardHeader className="items-center pb-2">
                <CardTitle className="text-white text-lg text-center">
                    { children }
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <ChartContainer config={chartConfig} className="aspect-square w-48">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="quantity" nameKey="sex" innerRadius={50} outerRadius={92} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const DashboardCharts = ({ datas }: { datas: string[] }) => {
    return (
        <div className="flex rounded-xl items-center h-81.5">
            <DataChart isBorder datas={ datas }>
                Distribuição de Colaboradores
            </DataChart>
            <DataChart isBorder datas={ datas }>
                Distribuição de Colaboradores
            </DataChart>
            <DataChart datas={ datas }>
                Distribuição de Colaboradores
            </DataChart>
        </div>
    )
}

export default DashboardCharts