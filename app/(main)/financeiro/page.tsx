"use client"

import InfoBadge from "@/components/InfoBadge"
import ActionButton from "@/components/Button"
import ActivityList, { type ActivityItem } from "@/components/ActivityList"
import MonthlyChart, { type MonthlyDataPoint } from "@/components/MonthlyChart"
import { useRouter } from "next/navigation"
import {
	CircleDollarSign,
	EyeOff,
	CreditCard,
	BarChart3,
	Bell,
	Users,
	Layers
} from "lucide-react"

// --- Mock Data ---

const MOCK_TRANSACTIONS: ActivityItem[] = [
	{
		id: "1",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<strong>Colaborador</strong> realizou um{" "}
				<span className="text-default-orange font-bold">pagamento</span>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	},
	{
		id: "2",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<strong>Colaborador</strong> realizou um{" "}
				<span className="text-default-orange font-bold">pagamento</span>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	},
	{
		id: "3",
		avatarFallback: "C",
		description: (
			<span className="text-white">
				<strong>Colaborador</strong> realizou um{" "}
				<span className="text-default-orange font-bold">pagamento</span>
			</span>
		),
		subtitle: "Às 14:44 | 28/02/2026"
	}
]

const MOCK_MONTHLY_DATA: MonthlyDataPoint[] = [
	{ month: "Jan", value: 8 },
	{ month: "Fev", value: 22 },
	{ month: "Mar", value: 25 },
	{ month: "Abr", value: 20 },
	{ month: "Mai", value: 30 },
	{ month: "Jun", value: 28 },
	{ month: "Jul", value: 32 },
	{ month: "Ago", value: 35 },
	{ month: "Set", value: 12 },
	{ month: "Out", value: 5 },
	{ month: "Nov", value: 28 },
	{ month: "Dez", value: 35 }
]

const Financeiro = () => {
	const router = useRouter()

	return (
		<>
			{/* Row 1 — Stats Cards + Top Action Buttons */}
			<section className="flex gap-5 items-stretch">
				<div className="flex gap-4 flex-1 min-w-0">
					<InfoBadge fill info="Saldo em conta" percent="+2%" period="Neste mês">
						R$00000
					</InfoBadge>
					<InfoBadge valueColor="text-green-500" info="A receber" percent="+3%" period="Neste mês">
						R$00000
					</InfoBadge>
					<InfoBadge valueColor="text-red-500" info="A pagar" percent="-1,3%" period="Neste mês">
						R$00000
					</InfoBadge>
				</div>
				<div className="flex gap-4">
					<ActionButton
						isFulled
						onClick={() => router.push("/financeiro/contas-receber")}
						icon={<CircleDollarSign size={40} color="black" strokeWidth={2} />}
					>
						Contas a receber
					</ActionButton>
					<ActionButton
						isFulled
						onClick={() => router.push("/financeiro/contas-pagar")}
						icon={<EyeOff size={40} color="black" strokeWidth={2} />}
					>
						Contas a pagar
					</ActionButton>
					<ActionButton
						isFulled
						onClick={() => router.push("/financeiro/cartoes")}
						icon={<CreditCard size={40} color="black" strokeWidth={2} />}
					>
						Cartões
					</ActionButton>
				</div>
			</section>

			{/* Row 2 — Chart + Transactions */}
			<section className="flex gap-6 min-h-96">
				<div className="w-1/2">
					<MonthlyChart
						title="Métricas do Financeiro"
						data={MOCK_MONTHLY_DATA}
						footerLabel="Ver todas as métricas"
						onFooterClick={() => router.push("/financeiro/metricas")}
					/>
				</div>

				<div className="w-1/2">
					<ActivityList
						title="Últimas transações"
						items={MOCK_TRANSACTIONS}
						emptyMessage="Nenhuma transação encontrada"
						footerLabel="Ver todas as transações"
						onFooterClick={() => router.push("/financeiro/transacoes")}
					/>
				</div>
			</section>

			{/* Row 3 — Bottom Action Buttons */}
			<section className="flex gap-4">
				<ActionButton
					horizontal
					onClick={() => router.push("/financeiro/relatorio-mensal")}
					icon={<BarChart3 size={36} color="#ffa300" strokeWidth={2.5} />}
				>
					Relatório mensal
				</ActionButton>
				<ActionButton
					horizontal
					onClick={() => router.push("/financeiro/alertas")}
					icon={<Bell size={36} color="#ffa300" strokeWidth={2.5} />}
				>
					Alertas financeiros
				</ActionButton>
				<ActionButton
					horizontal
					onClick={() => router.push("/financeiro/consultar-clientes")}
					icon={<Users size={36} color="#ffa300" strokeWidth={2.5} />}
				>
					Consultar Clientes
				</ActionButton>
				<ActionButton
					horizontal
					onClick={() => router.push("/financeiro/centro-custos")}
					icon={<Layers size={36} color="#ffa300" strokeWidth={2.5} />}
				>
					Centro de custos
				</ActionButton>
			</section>
		</>
	)
}

export default Financeiro
