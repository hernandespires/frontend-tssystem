"use client"

import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useEffect, useState } from "react"

const sexChartConfig = {
  quantity: { label: "Quantidade" }, male: { label: "Masculino", color: "#1490F5" }, female: { label: "Feminino", color: "#FF5CDC" }
} satisfies ChartConfig

const chartConfigCivilState = {
  quantity: { label: "Quantidade" },
  SINGLE: { label: "Solteiro(a)", color: "#FFA300" },
  DATING: { label: "Namorando", color: "#d303fc" },
  MARRIED: { label: "Casado(a)", color: "#2577f0" },
  WIDOWED: { label: "Viúvo(a)", color: "#fffd6a" }
} satisfies ChartConfig

const chartConfigOperations = {
  quantity: { label: "Quantidade" }, _01: { label: "01", color: "#FFA300" }, _02: { label: "02", color: "#fffd6a" }, _03: { label: "03", color: "#1490F5" }
} satisfies ChartConfig

type Employee = { sex: "MALE" | "FEMALE", civilState: string, operation: string }
type SexChartItem = { sex: "male" | "female", quantity: number, fill: string }

const DashboardCharts = ({ datas }: { datas: Employee[] }) => {
  const [sexChartData, setSexChartData] = useState<SexChartItem[]>([])
  const [civilStateChartData, setCivilStateChartData] = useState<any[]>([])
  const [operationsChartData, setOperationsChartData] = useState<any[]>([])

  useEffect(() => {
    let male = 0
    let female = 0

    datas.forEach((d) => {
      if (d.sex === "MALE") male++
      if (d.sex === "FEMALE") female++
    })

    const result: SexChartItem[] = [{ sex: "male", quantity: male, fill: "#1490F5" }, { sex: "female", quantity: female, fill: "#FF5CDC" }]

    setSexChartData(result)
  }, [datas])

  useEffect(() => {
    const counts: Record<string, number> = {}

    datas.forEach((d) => {
      counts[d.civilState] = (counts[d.civilState] || 0) + 1
    })

    const result = Object.entries(counts).map(([civilState, quantity]) => (
      { civilState, quantity, fill: civilState === "MARRIED" ? "#2577f0" : civilState === "WIDOWED" ? "#fffd6a" : civilState === "DATING" ? "#9415ad" : "#FFA300" }
    ))

    setCivilStateChartData(result)
  }, [datas])

  useEffect(() => {
    const counts: Record<string, number> = { _01: 0, _02: 0, _03: 0 }

    datas.forEach((d) => {
      counts[d.operation] = (counts[d.operation] || 0) + 1
    })

    const result = Object.entries(counts).map(([operations, quantity]) => ({ operations, quantity, fill: operations === "_02" ? "#fffd6a" : operations === "_03" ? "#1490F5" : "#FFA300" }))

    setOperationsChartData(result)
  }, [datas])

  return (
    <div className="flex rounded-xl items-center h-81.5">
      <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 border-r shadow-none">
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-white text-lg text-center">
            Distribuição por Sexo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={sexChartConfig} className="aspect-square w-48">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={sexChartData} dataKey="quantity" nameKey="sex" />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 border-r shadow-none">
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-white text-lg text-center">
            Estado Civil
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfigCivilState} className="aspect-square w-48">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={civilStateChartData} dataKey="quantity" nameKey="civilState" />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 shadow-none">
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-white text-lg text-center">
            Operações
          </CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <ChartContainer config={chartConfigOperations} className="aspect-square w-48">
            <BarChart data={operationsChartData} dataKey="quantity" layout="vertical">
              <CartesianGrid horizontal={false} />
              <XAxis type="number" dataKey="quantity" hide />
              <YAxis
                dataKey="operations" type="category" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => chartConfigOperations[value as keyof typeof chartConfigOperations]?.label ?? value}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantity" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardCharts