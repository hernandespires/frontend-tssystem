"use client"

import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useEffect, useState } from "react"

const sexChartConfig = {
  quantity: { label: "Quantidade" },
  male: { label: "Masculino", color: "var(--chart-1)" },
  female: { label: "Feminino", color: "var(--chart-5)" },
} satisfies ChartConfig

const chartConfigCivilState = {
  quantity: { label: "Quantidade" },
  SINGLE: { label: "Solteiro(a)", color: "var(--chart-1)" },
  MARRIED: { label: "Casado(a)", color: "var(--chart-5)" },
  WIDOWED: { label: "Viúvo(a)", color: "var(--chart-2)" },
} satisfies ChartConfig

const chartConfigOperations = {
  quantity: { label: "Quantidade" },
  _01: { label: "01", color: "var(--chart-1)" },
  _02: { label: "02", color: "var(--chart-5)" },
  _03: { label: "03", color: "var(--chart-2)" },
} satisfies ChartConfig

type Employee = {
  sex: "MALE" | "FEMALE"
  civilState: string
  operation: string
}

type SexChartItem = {
  sex: "male" | "female"
  quantity: number
  fill: string
}

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

    const result: SexChartItem[] = [{ sex: "male", quantity: male, fill: "var(--chart-1)" }, { sex: "female", quantity: female, fill: "var(--chart-5)" }]

    setSexChartData(result)
  }, [datas])

  useEffect(() => {
    const counts: Record<string, number> = {}

    datas.forEach((d) => {
      counts[d.civilState] = (counts[d.civilState] || 0) + 1
    })

    const result = Object.entries(counts).map(([civilState, quantity]) => ({
      civilState, quantity, fill: civilState === "MARRIED" ? "var(--chart-5)" : civilState === "WIDOWED" ? "var(--chart-2)" : "var(--chart-1)"
    }))

    setCivilStateChartData(result)
  }, [datas])

  useEffect(() => {
    const counts: Record<string, number> = {}

    datas.forEach((d) => {
      counts[d.operation] = (counts[d.operation] || 0) + 1
    })

    const result = Object.entries(counts).map(([operations, quantity]) => ({
      operations,
      quantity,
      fill:
        operations === "_02"
          ? "var(--chart-5)"
          : operations === "_03"
          ? "var(--chart-2)"
          : "var(--chart-1)",
    }))

    setOperationsChartData(result)
  }, [datas])

  return (
    <div className="flex rounded-xl items-center h-81.5">
      <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 border-r">
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
      {/* <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 border-r">
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-white text-lg text-center">
            Estado Civil
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-[365px]">
          <ChartContainer config={chartConfigCivilState} className="aspect-square w-48">
            <BarChart data={civilStateChartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="civilState" tickFormatter={(value) => chartConfigCivilState[value as keyof typeof chartConfigCivilState]?.label ?? value} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantity" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card> */}
            <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0 border-r">
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
      <Card className="bg-transparent w-full border-default-border-color gap-0 rounded-none border-0">
        <CardHeader className="items-center pb-2">
          <CardTitle className="text-white text-lg text-center">
            Operações
          </CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <ChartContainer config={chartConfigOperations} className="aspect-square w-48">
            <BarChart data={operationsChartData} layout="vertical">
              <CartesianGrid horizontal={false} />
              <XAxis type="number" dataKey="quantity" hide />
              <YAxis
                dataKey="operations"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => chartConfigOperations[value as keyof typeof chartConfigOperations]?.label ?? value}
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