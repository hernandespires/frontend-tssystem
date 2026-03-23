"use client"

import { useRouter } from "next/navigation"
import InfoBadge from "@/components/InfoBadge"
import ActionButton from "@/components/Button"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Search, ArrowUpDown, HandCoins, FileText, Users } from "lucide-react"
import { IoIosArrowForward } from "react-icons/io"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	ReferenceLine
} from "recharts"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from "@/components/ui/chart"

// --- Mock Data ---

const MOCK_ACCOUNTS = [
	{ id: "1", location: "Cliente 01", description: "Cliente/Pontual", value: "R$00000.00" },
	{ id: "2", location: "Cliente 01", description: "Cliente/Recorrencia", value: "R$000000.00" },
	{ id: "3", location: "Investimento X", description: "Investimento", value: "R$00000.00" }
]

const TOTAL_ACCOUNTS = 25
const TOTAL_RECEIVABLE_VALUE = "+R$0000,00"
const TOTAL_RECEIVABLE_MONTH = 173
const TOTAL_CLIENTS = 205

interface WeeklyDataPoint {
	label: string
	income: number
	expense: number
	forecast?: boolean
}

const MOCK_WEEKLY_DATA: WeeklyDataPoint[] = [
	{ label: "Seg", income: 85, expense: 0 },
	{ label: "Ter", income: 75, expense: 0 },
	{ label: "Qua", income: 50, expense: -40 },
	{ label: "Qui", income: 90, expense: 0 },
	{ label: "Sex", income: 60, expense: -45 },
	{ label: "Sab", income: 95, expense: 0 },
	{ label: "Seg", income: 70, expense: 0 },
	{ label: "Ter", income: 80, expense: 0 },
	{ label: "Qua", income: 55, expense: -50 },
	{ label: "Qui", income: 85, expense: 0 },
	{ label: "Sex", income: 45, expense: -55 },
	{ label: "Sab", income: 90, expense: 0 },
	{ label: "Seg", income: 60, expense: 0, forecast: true },
	{ label: "Ter", income: 70, expense: 0, forecast: true },
	{ label: "Qua", income: 45, expense: -35, forecast: true },
	{ label: "Qui", income: 75, expense: 0, forecast: true },
	{ label: "Sex", income: 50, expense: -40, forecast: true },
	{ label: "Sab", income: 65, expense: 0, forecast: true }
]

const CHART_CONFIG = {
	income: { label: "Recebido", color: "#ffa300" },
	expense: { label: "Despesa", color: "#ef4444" }
} satisfies ChartConfig

// --- Custom bar shape for forecast (dashed) vs solid bars ---

// Recharts shape prop expects (props: unknown) => Element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBarShape = (barColor: string) => (props: any) => {
	const { x = 0, y = 0, width = 0, height = 0, payload } = props
	const forecast = payload?.forecast as boolean | undefined

	if (height === 0) return <g />

	const barY = height < 0 ? y + height : y
	const barHeight = Math.abs(height)

	if (forecast) {
		return (
			<rect
				x={x}
				y={barY}
				width={width}
				height={barHeight}
				fill="transparent"
				stroke={barColor}
				strokeWidth={1.5}
				strokeDasharray="5 3"
				rx={3}
			/>
		)
	}

	return (
		<rect
			x={x}
			y={barY}
			width={width}
			height={barHeight}
			fill={barColor}
			rx={3}
		/>
	)
}

const IncomeBarShape = createBarShape("#ffa300")
const ExpenseBarShape = createBarShape("#ef4444")

// --- Page Component ---

const AccountsReceivable = () => {
	const router = useRouter()

	return (
		<>
			{/* Breadcrumb */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							href="/financeiro"
							className="text-gray-400 hover:text-white cursor-pointer"
						>
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-gray-500">/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage className="text-default-orange font-semibold">
							Contas à receber
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Main Content — Two Columns */}
			<section className="flex gap-6 items-stretch">
				{/* Left Column — Accounts Table */}
				<div className="flex flex-col border border-default-border-color rounded-md px-6 py-5 w-1/2">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h2 className="section-title">
							{TOTAL_ACCOUNTS} Contas a receber (00/00/00)
						</h2>
						<span className="text-default-orange font-bold text-base border border-default-orange rounded-md px-4 py-1.5">
							{TOTAL_RECEIVABLE_VALUE}
						</span>
					</div>

					{/* Search + Filter */}
					<div className="flex items-center gap-3 mb-4">
						<InputGroup className="flex-1">
							<InputGroupAddon>
								<Search size={18} />
							</InputGroupAddon>
							<InputGroupInput placeholder="Buscar conta..." />
						</InputGroup>
						<Select>
							<SelectTrigger className="w-auto border-default-orange text-default-orange gap-2">
								<SelectValue placeholder="Selecionar filtro" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								<SelectItem value="pontual">Pontual</SelectItem>
								<SelectItem value="recorrente">Recorrente</SelectItem>
								<SelectItem value="investimento">Investimento</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Table Header */}
					<div className="flex items-center py-3 border-b border-default-border-color">
						<span className="flex items-center gap-1 text-default-orange text-sm font-semibold w-[30%] cursor-pointer">
							Local <ArrowUpDown size={14} />
						</span>
						<span className="text-default-orange text-sm font-semibold w-[35%]">
							Descritivo
						</span>
						<span className="text-default-orange text-sm font-semibold flex-1">
							Valor
						</span>
					</div>

					{/* Table Rows */}
					<div className="flex flex-col flex-1">
						{MOCK_ACCOUNTS.map((account) => (
							<div
								key={account.id}
								className="flex items-center py-4 border-b border-default-border-color"
							>
								<span className="text-white text-sm w-[30%]">
									{account.location}
								</span>
								<span className="text-default-orange text-sm w-[35%]">
									{account.description}
								</span>
								<span className="text-white text-sm flex-1">
									{account.value}
								</span>
								<button className="text-white hover:text-default-orange cursor-pointer p-1">
									<IoIosArrowForward size={18} />
								</button>
							</div>
						))}
					</div>

					{/* Footer Buttons */}
					<div className="flex items-center justify-center gap-3 pt-5 mt-auto">
						<Button
							variant="outline"
							size="sm"
							className="px-4 py-2 cursor-pointer text-sm"
						>
							Visualizar todas recebimentos
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="px-4 py-2 cursor-pointer text-sm"
						>
							Anterior
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="px-4 py-2 cursor-pointer text-sm"
						>
							Próximo
						</Button>
					</div>
				</div>

				{/* Right Column — Stats + InfoBadges + Actions */}
				<div className="flex flex-col gap-4 w-1/2">
					{/* Stats Card */}
					<div className="flex border border-default-border-color rounded-md px-6 py-5">
						<div className="flex-1 text-center">
							<span className="text-5xl font-extrabold text-default-orange leading-none">
								{TOTAL_RECEIVABLE_MONTH}
							</span>
							<p className="text-white text-sm mt-2">Contas a receber (mês)</p>
						</div>
						<div className="flex-1 text-center">
							<span className="text-5xl font-extrabold text-default-orange leading-none">
								{TOTAL_CLIENTS}
							</span>
							<p className="text-white text-sm mt-2">Clientes</p>
						</div>
					</div>

					{/* InfoBadges */}
					<div className="flex gap-4">
						<InfoBadge
							valueColor="text-green-500"
							percentColor="text-green-500"
							info="A receber"
							percent="+3%"
							period="Neste mês"
						>
							R$00000
						</InfoBadge>
						<InfoBadge
							valueColor="text-red-500"
							percentColor="text-red-500"
							info="Em inadimplência"
							percent="-1,3%"
							period="Neste mês"
						>
							R$00000
						</InfoBadge>
						<InfoBadge
							valueColor="text-red-500"
							percentColor="text-red-500"
							info="Em atraso"
							percent="-1,3%"
							period="Neste mês"
						>
							R$00000
						</InfoBadge>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-4">
						<ActionButton
							isFulled
							flexible
							onClick={() => router.push("/financeiro/contas-receber/lancamento")}
							icon={<HandCoins size={38} color="black" strokeWidth={2} />}
						>
							Lançamento de Recebimento
						</ActionButton>
						<ActionButton
							isFulled
							flexible
							onClick={() => router.push("/financeiro/contas-receber/contas")}
							icon={<FileText size={38} color="black" strokeWidth={2} />}
						>
							Contas de recebimento
						</ActionButton>
						<ActionButton
							isFulled
							flexible
							onClick={() => router.push("/financeiro/consultar-clientes")}
							icon={<Users size={38} color="black" strokeWidth={2} />}
						>
							Consultar Clientes
						</ActionButton>
					</div>
				</div>
			</section>

			{/* Bottom Section — Weekly Chart */}
			<section className="flex flex-col border border-default-border-color rounded-md py-5 px-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-3">
					<h2 className="section-title">Histórico de contas à receber</h2>
					<span className="bg-default-orange text-black font-bold text-sm rounded-md px-4 py-1.5">
						Previsão {TOTAL_RECEIVABLE_VALUE}
					</span>
				</div>

				{/* Chart */}
				<div className="w-full">
					<ChartContainer config={CHART_CONFIG} className="w-full h-72">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={MOCK_WEEKLY_DATA}
								barCategoryGap="12%"
								barGap={1}
							>
								<CartesianGrid
									vertical={false}
									strokeDasharray="3 3"
									stroke="#333"
								/>
								<XAxis
									dataKey="label"
									tickLine={false}
									axisLine={false}
									tick={({ x, y, payload, index }) => {
										const isForecast = MOCK_WEEKLY_DATA[index]?.forecast
										const isExpenseDay = MOCK_WEEKLY_DATA[index]?.expense < 0
										return (
											<text
												x={x}
												y={y + 14}
												textAnchor="middle"
												fill={isExpenseDay ? "#ef4444" : isForecast ? "#9ca3af" : "#ffa300"}
												fontSize={12}
												fontWeight={500}
											>
												{payload.value}
											</text>
										)
									}}
								/>
								<YAxis hide />
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{ fill: "rgba(255,163,0,0.06)" }}
								/>
								<ReferenceLine x="" y={0} stroke="#555" strokeWidth={1} />
								<Bar
									dataKey="income"
									maxBarSize={28}
									shape={IncomeBarShape}
								/>
								<Bar
									dataKey="expense"
									maxBarSize={28}
									shape={ExpenseBarShape}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>

				{/* Footer */}
				<div className="flex justify-center pt-4">
					<Button
						variant="outline"
						size="sm"
						className="px-5 py-2.5 cursor-pointer text-sm gap-2"
						onClick={() => router.push("/financeiro/contas-receber/historico")}
					>
						<RiGitRepositoryCommitsFill size={16} />
						Ver histórico de recebimentos
					</Button>
				</div>
			</section>
		</>
	)
}

export default AccountsReceivable
