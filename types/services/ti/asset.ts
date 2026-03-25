import { Employee } from "@/types/services/humanResources/employee"

export interface Asset {
	id_patrimonio?: string
	tipo_patrimonio: string
	categoria: string
	departamento: string
	marca?: string
	modelo_completo?: string
	numero_serie?: string
	tamanho?: string
	status: string
	valor?: number
	data_compra?: string
	fornecedor?: string
	informacoes_adicionais?: string
	id_colaborador?: Employee | string
}

export interface SendAsset {
	tipo_patrimonio: string
	categoria: string
	departamento: string
	marca?: string
	modelo_completo?: string
	numero_serie?: string
	tamanho?: string
	status: string
	valor?: number
	data_compra?: string
	fornecedor?: string
	informacoes_adicionais?: string
	id_colaborador?: { id: string }
}
