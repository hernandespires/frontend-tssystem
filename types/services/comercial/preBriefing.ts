export interface PreBriefing {
	id: string
	projectType: "PUNCTUAL" | "APPELLANT"
	paymentMethod: "PIX" | "INVOICE" | "PAYMENT_SLIP"
	hasInstallments: boolean
	installments: number
	entryValue: string
	clientName: string
	nacionality: "BRAZILIAN" | "AMERICAN"
	email: string
	phone: string
	address: string
	documentType: "ITIN" | "EIN" | "CNPJ"
	documentNumber: string
	segment: "FLOORING"
	bussinessName: string
	programType: "ACCELERATOR_PROGRAM"
	programPeriod: string
	projectStartDate: string
	contractDate: string
	paymentDate: string
	leadSource: string
	leadArrivalDate: string
	meetingLink: string
}

export interface SendPreBriefing {
	projectType: string
	paymentMethod: string
	hasInstallments: boolean
	installments: number
	entryValue: number
	clientName: string
	nacionality: string
	email: string
	phone: string
	address: string
	documentType: string
	documentNumber: string
	bussinessDocumentType: string
	bussinessDocumentNumber: string
	segment: string
	bussinessName: string
	programType: string
	programPeriod: string
	projectStartDate: string
	contractDate: string
	paymentDate: string
	leadSource: string
	leadArrivalDate: string
	meetingLink: string
}
