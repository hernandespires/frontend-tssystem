export interface PreBriefing {
	id: string
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
