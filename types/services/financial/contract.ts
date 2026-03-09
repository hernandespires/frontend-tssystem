export interface Contract {
	id?: string
	client: string
	company: string
	program: string
	contractType: "PUNCTUAL" | "APPELLANT"
	contractStatus: string
	startDate: string
	endDate: string
	value: number
	paymentMethod: number
	renovations: number
}
