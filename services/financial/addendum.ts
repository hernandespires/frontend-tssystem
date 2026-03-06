import api from "@/lib/api"
import { ContractAddendum } from "@/types/services/financial/contractAddendum"
import { defaultRoute } from "./defaultRoute"

export const findAllContractAddenda = async (): Promise<ContractAddendum[]> => {
	return (await api.get(defaultRoute + "/allContractAddendum")).data
}

export const findContractAddendumById = async (id: string): Promise<ContractAddendum> => {
	return (await api.get(defaultRoute + "/getContractAddendum/" + id)).data
}

export const createContractAddendum = async (payload: ContractAddendum): Promise<ContractAddendum> => {
	return (await api.post(defaultRoute + "/saveContractAddendum", payload)).data
}

export const updateContractAddendum = async (id: string, payload: ContractAddendum): Promise<ContractAddendum> => {
	return (await api.put(defaultRoute + "/editContractAddendum/" + id, payload)).data
}

export const deleteContractAddendum = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteContractAddendum/" + id)
}
