"use client"

import InfoBadge from "@/components/InfoBadge"
import ActionButton from "@/components/Button"
import ActivityList, { type ActivityItem } from "@/components/ActivityList"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IoIosArrowForward } from "react-icons/io"
import { RiGitRepositoryCommitsFill } from "react-icons/ri"
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
	Settings,
	Lock,
	Package,
	Cctv,
	UserPlus,
	Box
} from "lucide-react"
import {
	Pie,
	PieChart,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip
} from "recharts"

// --- Mock Data ---

const MOCK_TICKETS: ActivityItem[] = [
	{
		id: "1",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<strong>Colaborador</strong> solicitou um{" "}
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
				<strong>Colaborador</strong> solicitou um{" "}
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

const TOTAL_USERS = 70

const MOCK_GENDER_CHART_1 = [
	{ name: "Feminino", value: 45, color: "#FF5CDC" },
	{ name: "Masculino", value: 55, color: "#1490F5" }
]

const MOCK_GENDER_CHART_2 = [
	{ name: "Feminino", value: 40, color: "#FF5CDC" },
	{ name: "Masculino", value: 60, color: "#1490F5" }
]

const Ti = () => {
	const router = useRouter()

	return (
		<>
			{/* Row 1 — Stats + Top Action Buttons */}
			<section className="flex gap-6 items-stretch">
				<div className="flex gap-4 w-1/2">
					<InfoBadge fill info="Novos Chamados">03</InfoBadge>
					<InfoBadge info="Resolvidos">10</InfoBadge>
					<InfoBadge info="Não Resolvidos">03</InfoBadge>
				</div>

				<div className="flex gap-4 w-1/2">
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-chamados")}
						icon={<Settings size={38} color="black" strokeWidth={2} />}
					>
						Controle de Chamados
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-acessos")}
						icon={<Lock size={38} color="black" strokeWidth={2} />}
					>
						Controle de Acessos
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-patrimonios")}
						icon={<Package size={38} color="black" strokeWidth={2} />}
					>
						Controle de Patrimônios
					</ActionButton>
				</div>
			</section>

			{/* Row 2 — Tickets + Bottom Action Buttons */}
			<section className="flex gap-6 items-stretch">
				<div className="w-1/2">
					<ActivityList
						title="Últimos chamados"
						items={MOCK_TICKETS}
						emptyMessage="Nenhum chamado encontrado"
						footerLabel="Ver todos os chamados"
						onFooterClick={() => router.push("/ti/chamados")}
					/>
				</div>

				<div className="flex gap-4 w-1/2">
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/controle-cameras")}
						icon={<Cctv size={38} color="black" strokeWidth={2} />}
					>
						Controle de Câmeras
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/cadastro-usuarios")}
						icon={<UserPlus size={38} color="black" strokeWidth={2} />}
					>
						Cadastro de Usuários
					</ActionButton>
					<ActionButton
						isFulled
						flexible
						onClick={() => router.push("/ti/cadastro-patrimonios")}
						icon={<Box size={38} color="black" strokeWidth={2} />}
					>
						Cadastro de Patrimônios
					</ActionButton>
				</div>
			</section>

			{/* Row 3 — User List + Metrics */}
			<section className="flex gap-6 items-stretch">
				{/* User List */}
				<div className="flex flex-col border border-default-border-color rounded-md px-6 py-5 w-1/2">
					<h2 className="section-title mb-3">Lista de usuários</h2>

					<div className="flex items-center gap-3 mb-4">
						<InputGroup className="flex-1">
							<InputGroupAddon>
								<Search size={18} />
							</InputGroupAddon>
							<InputGroupInput placeholder="Procurar colaboradores" />
						</InputGroup>
						<span className="text-sm text-gray-400 whitespace-nowrap">
							{TOTAL_USERS} colaboradores
						</span>
					</div>

					<div className="flex flex-col flex-1">
						{MOCK_USERS.map((user, index) => (
							<div
								key={user.id}
								className={`
									flex items-center justify-between py-4
									${index < MOCK_USERS.length - 1 ? "border-b border-default-border-color" : ""}
								`}
							>
								<div className="flex items-center gap-3.5">
									<Avatar className="w-11 h-11 shrink-0">
										<AvatarImage src="" />
										<AvatarFallback className="bg-default-orange/20 text-default-orange font-bold text-sm">
											{user.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col gap-0.5">
										<span className="text-default-orange text-sm font-semibold">{user.name}</span>
										<span className="text-xs text-gray-500">{user.email}</span>
									</div>
								</div>
								<button className="text-white hover:text-default-orange cursor-pointer p-1">
									<IoIosArrowForward size={20} />
								</button>
							</div>
						))}
					</div>

					<div className="flex justify-center pt-4 mt-auto">
						<Button
							variant="outline"
							size="sm"
							className="px-5 py-2.5 cursor-pointer text-sm gap-2"
							onClick={() => router.push("/ti/usuarios")}
						>
							<RiGitRepositoryCommitsFill size={16} />
							Ver todos colaboradores
						</Button>
					</div>
				</div>

				{/* Metrics */}
				<div className="flex flex-col border border-default-border-color rounded-md px-6 py-5 w-1/2">
					<h2 className="section-title mb-3">Métricas do TI</h2>

					<div className="flex-1 flex items-center justify-center gap-2">
						<div className="w-1/2 h-56">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={MOCK_GENDER_CHART_1}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={80}
										strokeWidth={0}
									>
										{MOCK_GENDER_CHART_1.map((entry) => (
											<Cell key={entry.name} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											backgroundColor: "#1a1a1a",
											border: "1px solid #404040",
											borderRadius: "6px",
											color: "white"
										}}
									/>
									<Legend
										verticalAlign="middle"
										align="left"
										layout="vertical"
										iconType="circle"
										iconSize={8}
										formatter={(value: string) => (
											<span className="text-xs text-gray-300">{value}</span>
										)}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className="w-1/2 h-56">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={MOCK_GENDER_CHART_2}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={80}
										strokeWidth={0}
									>
										{MOCK_GENDER_CHART_2.map((entry) => (
											<Cell key={entry.name} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											backgroundColor: "#1a1a1a",
											border: "1px solid #404040",
											borderRadius: "6px",
											color: "white"
										}}
									/>
									<Legend
										verticalAlign="middle"
										align="left"
										layout="vertical"
										iconType="circle"
										iconSize={8}
										formatter={(value: string) => (
											<span className="text-xs text-gray-300">{value}</span>
										)}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className="flex justify-center pt-4">
						<Button
							variant="outline"
							size="sm"
							className="px-5 py-2.5 cursor-pointer text-sm gap-2"
							onClick={() => router.push("/ti/metricas")}
						>
							<RiGitRepositoryCommitsFill size={16} />
							Ver todas as métricas
						</Button>
					</div>
				</div>
			</section>
		</>
	)
}

export default Ti
