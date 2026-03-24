"use client"

import InfoBadge from "@/components/InfoBadge"
import ActionButton from "@/components/Button"
import ActivityList, { type ActivityItem } from "@/components/ActivityList"
import MonthlyChart, { type MonthlyDataPoint } from "@/components/MonthlyChart"
import { useRouter } from "next/navigation"
import { Video, ClipboardPlus, BadgeCheck, Briefcase, Lock, LifeBuoy } from "lucide-react"

// --- Mock Data ---

const MOCK_MEETINGS: ActivityItem[] = [
	{
		id: "1",
		avatarFallback: "S",
		description: (
			<span className="text-default-orange">
				SDR cadastrou uma reunião de <strong>MTM Constr...</strong>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	},
	{
		id: "2",
		avatarFallback: "S",
		description: (
			<span className="text-default-orange">
				SDR cadastrou uma reunião de <strong>MTM Constr...</strong>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	},
	{
		id: "3",
		avatarFallback: "S",
		description: (
			<span className="text-default-orange">
				SDR cadastrou uma reunião de <strong>MTM Constr...</strong>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	}
]

const MOCK_MONTHLY_DATA: MonthlyDataPoint[] = [
	{ month: "Jan", value: 18 },
	{ month: "Fev", value: 25 },
	{ month: "Mar", value: 22 },
	{ month: "Abr", value: 30 },
	{ month: "Mai", value: 35 },
	{ month: "Jun", value: 28 },
	{ month: "Jul", value: 32 },
	{ month: "Ago", value: 20 },
	{ month: "Set", value: 10 },
	{ month: "Out", value: 8 },
	{ month: "Nov", value: 5 },
	{ month: "Dez", value: 3 }
]

const Comercial = () => {
	const router = useRouter()

	return (
		<>
			{/* Row 1 — Stats Cards */}
			<section className="flex gap-4">
				<InfoBadge fill info="Novas reuniões">
					+3
				</InfoBadge>
				<InfoBadge info="Total de reuniões">22</InfoBadge>
				<InfoBadge info="Canceladas">4</InfoBadge>
				<InfoBadge fill valueColor="text-red-600" info="Não fechados" percent="-4%" period="Neste mês">
					4
				</InfoBadge>
				<InfoBadge fill valueColor="text-green-600" info="Fechados" percent="+12%" period="Neste mês">
					12
				</InfoBadge>
				<InfoBadge fill info="Taxa de fechamento">
					78%
				</InfoBadge>
			</section>

			{/* Row 2 — Main Content */}
			<section className="flex gap-6">
				{/* Left Column */}
				<div className="flex flex-col gap-6 w-1/2">
					<ActivityList
						title="Reuniões Agendadas"
						items={MOCK_MEETINGS}
						emptyMessage="Nenhuma reunião agendada"
						footerLabel="Ver histórico de reuniões"
						onFooterClick={() => router.push("/comercial/reunioes")}
					/>

					<div className="flex gap-4 justify-between">
						<ActionButton isFulled onClick={() => router.push("/comercial/carteira-clientes")} icon={<Briefcase size={36} color="black" strokeWidth={2} />}>
							Carteira de Clientes
						</ActionButton>
						<ActionButton isFulled onClick={() => router.push("/comercial/acessos")} icon={<Lock size={36} color="black" strokeWidth={2} />}>
							Acessos
						</ActionButton>
						<ActionButton onClick={() => router.push("/comercial/chamado")} icon={<LifeBuoy size={36} color="white" strokeWidth={2} />}>
							Realizar Chamado
						</ActionButton>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex flex-col gap-6 w-1/2">
					<div className="flex gap-4 justify-between">
						<ActionButton isFulled onClick={() => router.push("/comercial/reunioes")} icon={<Video size={36} color="black" strokeWidth={2} />}>
							Reuniões
						</ActionButton>
						<ActionButton
							isFulled
							onClick={() => router.push("comercial/cadastro-pre-biefing")}
							icon={<ClipboardPlus size={36} color="black" strokeWidth={2} />}
						>
							Cadastrar Pré-Briefing
						</ActionButton>
						<ActionButton onClick={() => router.push("/comercial/comissoes")} icon={<BadgeCheck size={36} color="white" strokeWidth={2} />}>
							Comissões
						</ActionButton>
					</div>

					<MonthlyChart
						title="Métricas do Comercial"
						data={MOCK_MONTHLY_DATA}
						footerLabel="Ver todas as métricas"
						onFooterClick={() => router.push("/comercial/metricas")}
					/>
				</div>
			</section>
		</>
	)
}

export default Comercial
