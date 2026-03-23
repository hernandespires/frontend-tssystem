export interface PreBriefing {
	id?: string
	projectType: "PUNCTUAL" | "APPELLANT"
	paymentMethod: "PIX" | "INVOICE" | "PAYMENT_SLIP"
	hasInstallments: boolean
	installments: number
	entryValue: string
	clientName: string
	nacionality: "BRAZILIAN" | "AMERICAN"
	email: string
	phone: string
	bussinessDocumentType: "ITIN" | "EIN" | "CNPJ"
	bussinessDocumentNumber: string
	segment: "FLOORING"
	bussinessName: string
	programType: "ACCELERATOR_PROGRAM"
	contractDate: string
	paymentDate: string
	leadSource: string
	leadArrivalDate: string
	meetingLink: string
}

export type SendPreBriefing = Omit<PreBriefing, 'id'>
