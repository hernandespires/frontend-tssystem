import DataTable from "@/components/DataTable"
import InfoBadge from "@/components/InfoBadge"

const Comercial = () => (
	<>
		<section className="flex justify-between">
			<InfoBadge fill info="Novas reuniões">
				+3
			</InfoBadge>
			<InfoBadge info="Total de reuniões">22</InfoBadge>
			<InfoBadge valueColor="blue" info="Canceladas">
				4
			</InfoBadge>
			<InfoBadge
				valueColor="red"
				info="Não fechadas"
				percent="-4%"
				period="Neste mês"
			>
				4
			</InfoBadge>
			<InfoBadge
				valueColor="orange"
				info="Fechados"
				percent="+12%"
				period="Neste mês"
			>
				12
			</InfoBadge>
			<InfoBadge info="Taxa de fechamento">78%</InfoBadge>
		</section>
		<DataTable filter="Reuniões Agendadas" />
	</>
)

export default Comercial
