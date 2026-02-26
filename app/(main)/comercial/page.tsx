"use client"

import Button from "@/components/Button"
import DataTable from "@/components/DataTable"
import InfoBadge from "@/components/InfoBadge"
import { SiGooglemeet } from "react-icons/si"

const Comercial = () => {
	return (
		<>
			<section className="flex justify-between gap-x-4">
				<InfoBadge fill info="Novas reuniões">
					+3
				</InfoBadge>
				<InfoBadge info="Total de reuniões">22</InfoBadge>
				<InfoBadge valueColor="blue" info="Canceladas">
					4
				</InfoBadge>
				<InfoBadge valueColor="red" info="Não fechadas" percent="-4%" period="Neste mês">
					4
				</InfoBadge>
				<InfoBadge valueColor="orange" info="Fechados" percent="+12%" period="Neste mês">
					12
				</InfoBadge>
				<InfoBadge info="Taxa de fechamento">78%</InfoBadge>
			</section>
			<section className="flex justify-between gap-x-1.75">
				<div className="flex flex-col gap-y-1.75">
					<div>
						<DataTable
							filter="Reuniões Agendadas"
							// data={allEmployees}
							// setContextInfo={setEmployeeFound}
							path="/rh/cadastro-colaborador"
							minHeight="[399px]"
						/>
					</div>
					<div className="flex justify-between">
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
				<div className="flex justify-between w-1/2">
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
			</section>
		</>
	)
}

export default Comercial
