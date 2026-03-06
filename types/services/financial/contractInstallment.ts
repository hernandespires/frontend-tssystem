export interface ContractInstallment {
	id?: string
	contract: string
	contractAddendum: string
	installments: number
	expirationData: string
	installmentValue: number
	status: string
}
