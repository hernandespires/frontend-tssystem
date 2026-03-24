"use client"

import InfoBadge from "@/components/InfoBadge"
import ActionButton from "@/components/Button"
import ActivityList, { type ActivityItem } from "@/components/ActivityList"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import { Search, LifeBuoy, Lock, Laptop, Cctv, HardDriveDownload, Package, BarChart3 } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
	Pie,
	PieChart,
	Cell,
	ResponsiveContainer,
	Tooltip
} from "recharts"

// --- Constants ---

const CHART_COLOR_PINK = "#FF4081"
const CHART_COLOR_BLUE = "#29B6F6"
const TOTAL_USERS = 70

// --- Mock Data ---

const MOCK_TICKETS: ActivityItem[] = [
	{
		id: "1",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<span className="text-default-orange font-semibold">Colaborador</span> solicitou um{" "}
				<span className="text-default-orange font-bold">chamado Crítico</span>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	},
	{
		id: "2",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<span className="text-default-orange font-semibold">Colaborador</span> solicitou um{" "}
				<span className="text-default-orange font-bold">chamado</span>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	}
]

const MOCK_USERS = [
	{ id: "1", name: "Colaborador", email: "colaborador@trajetoriadosucesso.com" },
	{ id: "2", name: "Colaborador", email: "colaborador@trajetoriadosucesso.com" },
	{ id: "3", name: "Colaborador", email: "colaborador@trajetoriadosucesso.com" }
]

const MOCK_GENDER_CHART_1 = [
	{ name: "Feminino", value: 48.0, color: CHART_COLOR_PINK },
	{ name: "Masculino", value: 52.0, color: CHART_COLOR_BLUE }
]

const MOCK_GENDER_CHART_2 = [
	{ name: "Feminino", value: 48.7, color: CHART_COLOR_PINK },
	{ name: "Masculino", value: 51.3, color: CHART_COLOR_BLUE }
]

// --- Donut Chart Component ---

interface DonutChartWithLabelsProps {
	data: { name: string; value: number; color: string }[]
}

const DonutChartWithLabels = ({ data }: DonutChartWithLabelsProps) => {
	return (
		<div className="flex items-center justify-center gap-4">
			{/* Left label */}
			<div className="flex flex-col items-end gap-0.5 min-w-[60px]">
				<span className="text-xs text-[#A09E9C]">{data[0].name}</span>
				<span className="text-sm font-bold" style={{ color: data[0].color }}>
					{data[0].value.toFixed(1).replace(".", ",")}%
				</span>
			</div>

			{/* Chart */}
			<div className="w-[120px] h-[120px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							innerRadius={36}
							outerRadius={55}
							strokeWidth={0}
						>
							{data.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "#1A1510",
								border: "1px solid #2A241D",
								borderRadius: "8px",
								color: "white",
								fontSize: "12px"
							}}
							formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Right label */}
			<div className="flex flex-col items-start gap-0.5 min-w-[60px]">
				<span className="text-xs text-[#A09E9C]">{data[1].name}</span>
				<span className="text-sm font-bold" style={{ color: data[1].color }}>
					{data[1].value.toFixed(1).replace(".", ",")}%
				</span>
			</div>
		</div>
	)
}

// --- Page Component ---

const Ti = () => {
	const router = useRouter()

	return (
		<div className="grid grid-cols-[45%_55%] gap-6">
			{/* ========== LEFT COLUMN ========== */}
			<div className="flex flex-col gap-4">
				{/* Ticket Counters */}
				<div className="grid grid-cols-3 gap-4">
					<InfoBadge fill info="Novos Chamados">03</InfoBadge>
					<InfoBadge info="Resolvidos">10</InfoBadge>
					<InfoBadge info="Não Resolvidos">03</InfoBadge>
				</div>

				{/* Latest Tickets */}
				<ActivityList
					title="Últimos chamados"
					items={MOCK_TICKETS}
					emptyMessage="Nenhum chamado encontrado"
					footerLabel="Ver todos os chamados"
					onFooterClick={() => router.push("/ti/chamados")}
				/>

				{/* User List */}
				<div className="flex flex-col border border-[#2A241D] rounded-[12px] px-6 py-5">
					<h2 className="section-title mb-3">Lista de usuários</h2>

					<div className="flex items-center gap-3 mb-4">
						<InputGroup className="flex-1 border-[#2A241D] bg-[#1A1510]">
							<InputGroupAddon>
								<Search size={18} />
							</InputGroupAddon>
							<InputGroupInput placeholder="Procurar colaboradores" />
						</InputGroup>
						<span className="text-sm text-[#A09E9C] whitespace-nowrap">
							{TOTAL_USERS} colaboradores
						</span>
					</div>

					<div className="flex flex-col">
						{MOCK_USERS.map((user, index) => (
							<div
								key={user.id}
								className={`
									flex items-center justify-between py-4
									${index < MOCK_USERS.length - 1 ? "border-b border-[#2A241D]" : ""}
								`}
							>
								<div className="flex items-center gap-3.5">
									<Avatar className="w-11 h-11 shrink-0 grayscale">
										<AvatarImage src="" />
										<AvatarFallback className="bg-default-orange/20 text-default-orange font-bold text-sm">
											{user.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col gap-0.5">
										<span className="text-default-orange text-sm font-semibold">{user.name}</span>
										<span className="text-xs text-[#A09E9C]">{user.email}</span>
									</div>
								</div>
								<button className="text-white hover:text-default-orange cursor-pointer p-1 transition-colors">
									<IoIosArrowForward size={20} />
								</button>
							</div>
						))}
					</div>

					<div className="flex justify-center pt-4">
						<Button
							variant="outline"
							size="sm"
							className="px-5 py-2.5 cursor-pointer text-sm gap-2 rounded-md"
							onClick={() => router.push("/ti/usuarios")}
						>
							<RiGitRepositoryCommitsFill size={16} />
							Ver todos colaboradores
						</Button>
					</div>
				</div>
			</div>

			{/* ========== RIGHT COLUMN ========== */}
			<div className="flex flex-col gap-4">
				{/* Quick Actions Grid (3 columns, 2 rows) */}
				<div className="grid grid-cols-3 gap-4">
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-chamados")}
						icon={<LifeBuoy size={38} color="black" strokeWidth={2} />}
					>
						{"Controle de\nChamados"}
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-acessos")}
						icon={<Lock size={38} color="black" strokeWidth={2} />}
					>
						{"Controle de\nAcessos"}
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-patrimonios")}
						icon={<Laptop size={38} color="black" strokeWidth={2} />}
					>
						{"Controle de\nPatrimônios"}
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-cameras")}
						icon={<Cctv size={38} color="black" strokeWidth={2} />}
					>
						{"Controle de\nCâmeras"}
					</ActionButton>
					<ActionButton
						flexible
						onClick={() => router.push("/ti/cadastro-usuarios")}
						icon={<HardDriveDownload size={38} color="white" strokeWidth={2} />}
					>
						{"Cadastro de\nUsuários"}
					</ActionButton>
					<ActionButton
						flexible
						onClick={() => router.push("/ti/cadastro_patrimonio")}
						icon={<Package size={38} color="white" strokeWidth={2} />}
					>
						{"Cadastro de\nPatrimônios"}
					</ActionButton>
				</div>

				{/* TI Metrics */}
				<div className="flex flex-col border border-[#2A241D] rounded-[12px] px-6 py-5">
					<h2 className="section-title mb-4">Métricas do TI</h2>

					<div className="flex items-center justify-around flex-1 py-4">
						<DonutChartWithLabels data={MOCK_GENDER_CHART_1} />
						<DonutChartWithLabels data={MOCK_GENDER_CHART_2} />
					</div>

					<div className="flex justify-center pt-4">
						<Button
							variant="outline"
							size="sm"
							className="px-5 py-2.5 cursor-pointer text-sm gap-2 rounded-md"
							onClick={() => router.push("/ti/metricas")}
						>
							<BarChart3 size={16} />
							Ver todas as métricas
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Ti
