export interface Payment {
	id: string
	contractAddendum: string
	paymentDate: string
	value: number
	method: string
	transitionId: string
}
