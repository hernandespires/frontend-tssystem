import api from "@/lib/api"
import { defaultRoute } from "./defaultRoute"
import { SendPreBriefing } from "@/types/services/comercial/preBriefing"
import { format } from "date-fns"

interface PreBriefingPayload {
	tipo_contrato: string
	forma_pagamento: string
	quantidade_parcelas: number
	valor_lancamento: string
	nome_cliente: string
	nacionalidade: string
	email: string
	telefone: string
	tipo_tax_id: string
	tax_id: string
	segmento: string
	razao_social: string
	nome_programa: string
	data_contrato: string
	data_pagamento: string
	origem_lead: string
	data_chegada_lead: string
	link_reuniao: string
}

const PROGRAM_TYPE_LABELS: Record<string, string> = {
	ACCELERATOR_PROGRAM: "Programa Acelerador"
}

const LEAD_SOURCE_LABELS: Record<string, string> = {
	ACTIVE_PROSPECTING: "Prospecção Ativa"
}

const formatDateToBrazilian = (isoDate: string): string => {
	try {
		return format(new Date(isoDate), "dd/MM/yyyy")
	} catch {
		return isoDate
	}
}

const buildPayload = (data: SendPreBriefing): PreBriefingPayload => ({
	tipo_contrato: data.projectType,
	forma_pagamento: data.paymentMethod,
	quantidade_parcelas: data.hasInstallments ? data.installments : 1,
	valor_lancamento: data.entryValue,
	nome_cliente: data.clientName,
	nacionalidade: data.nacionality,
	email: data.email,
	telefone: data.phone,
	tipo_tax_id: data.bussinessDocumentType,
	tax_id: data.bussinessDocumentNumber,
	segmento: data.segment,
	razao_social: data.bussinessName,
	nome_programa: PROGRAM_TYPE_LABELS[data.programType] ?? data.programType,
	data_contrato: formatDateToBrazilian(data.contractDate),
	data_pagamento: formatDateToBrazilian(data.paymentDate),
	origem_lead: LEAD_SOURCE_LABELS[data.leadSource] ?? data.leadSource,
	data_chegada_lead: formatDateToBrazilian(data.leadArrivalDate),
	link_reuniao: data.meetingLink
})

export const savePreBriefing = async (data: SendPreBriefing): Promise<string> => {
	const payload = buildPayload(data)
	const response = await api.post(`${defaultRoute}/savePreBriefing`, payload)
	return response.data
}
