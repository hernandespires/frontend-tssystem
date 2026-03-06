import api from "@/lib/api"
import { Contract } from "@/types/services/financial/contract"
import { defaultRoute } from "./defaultRoute"

export const findAllContracts = async (): Promise<Contract[]> => {
	return (await api.get(defaultRoute + "/allContract")).data
}

export const findContractById = async (id: string): Promise<Contract> => {
	return (await api.get(defaultRoute + "/getContract/" + id)).data
}

export const createContract = async (payload: Contract): Promise<Contract> => {
	return (await api.post(defaultRoute + "/saveContract", payload)).data
}

export const updateContract = async (id: string, payload: Contract): Promise<Contract> => {
	return (await api.put(defaultRoute + "/editContract/" + id, payload)).data
}

export const deleteContract = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteContract/" + id)
}
