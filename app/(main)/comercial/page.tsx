"use client"

import Button from "@/components/Button"
import DataMetrics from "@/components/DataMetrics"
import DataTable from "@/components/DataTable"
import InfoBadge from "@/components/InfoBadge"
import { useRouter } from "next/navigation"
import { SiGooglemeet } from "react-icons/si"

const Comercial = () => {
	const router = useRouter()

	return (
		<>
			<section className="flex justify-between gap-x-4">
				<InfoBadge fill info="Novas reuniões">
					+3
				</InfoBadge>
				<InfoBadge info="Total de reuniões">22</InfoBadge>
				<InfoBadge valueColor="text-blue-500" info="Canceladas">
					4
				</InfoBadge>
				<InfoBadge valueColor="text-red-500" info="Não fechadas" percent="-4%" period="Neste mês">
					4
				</InfoBadge>
				<InfoBadge valueColor="text-orange-500" info="Fechados" percent="+12%" period="Neste mês">
					12
				</InfoBadge>
				<InfoBadge info="Taxa de fechamento">78%</InfoBadge>
			</section>
			<section className="flex justify-between gap-x-6">
				<div className="flex flex-col gap-y-6 w-full">
					<div>
						<DataTable filter="Reuniões Agendadas" path="/rh/cadastro-colaborador" className="min-h-99.75" />
					</div>
					<div className="flex justify-between flex-wrap">
						<Button isFulled onClick={() => ""} icon={<SiGooglemeet size={36} color="black" />}>
							Reunião
						</Button>
						<Button isFulled onClick={() => ""} icon={<SiGooglemeet size={36} color="black" />}>
							Cadastrar Pré-Briefing
						</Button>
						<Button onClick={() => ""} icon={<SiGooglemeet size={36} color="white" />}>
							Comissão
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-y-6 w-full">
					<div className="flex justify-between">
						<Button isFulled onClick={() => ""} icon={<SiGooglemeet size={36} color="black" />}>
							Reunião
						</Button>
						<Button isFulled onClick={() => router.push("comercial/cadastro-pre-biefing")} icon={<SiGooglemeet size={36} color="black" />}>
							Cadastrar Pré-Briefing
						</Button>
						<Button onClick={() => ""} icon={<SiGooglemeet size={36} color="white" />}>
							Comissão
						</Button>
					</div>
					<DataMetrics department="comercial" />
				</div>
			</section>
		</>
	)
}

export default Comercial
