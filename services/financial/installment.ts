import api from "@/lib/api"
import { ContractInstallment } from "@/types/services/financial/contractInstallment"
import { defaultRoute } from "./defaultRoute"

export const findAllContractInstallments = async (): Promise<ContractInstallment[]> => {
	return (await api.get(defaultRoute + "/allContractInstallment")).data
}

export const findContractInstallmentById = async (id: string): Promise<ContractInstallment> => {
	return (await api.get(defaultRoute + "/getContractInstallment/" + id)).data
}

export const createContractInstallment = async (payload: ContractInstallment): Promise<ContractInstallment> => {
	return (await api.post(defaultRoute + "/saveContractInstallment", payload)).data
}

export const updateContractInstallment = async (id: string, payload: ContractInstallment): Promise<ContractInstallment> => {
	return (await api.put(defaultRoute + "/editContractInstallment/" + id, payload)).data
}

export const deleteContractInstallment = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteContractInstallment/" + id)
}
