export interface Client {
	id: string
	name: string
	birthday: string
	sex: "MALE" | "FEMALE"
	documentType: "RG" | "CPF"
	documentNumber: string
}

export interface SendClient {
	name: string
	birthday: string
	sex: "MALE" | "FEMALE"
	documentType: "RG" | "CPF"
	documentNumber: string
}
