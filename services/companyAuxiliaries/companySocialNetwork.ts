import api from "@/lib/api"
import { CompanySocialNetwork } from "@/types/services/companyAuxiliaries/companySocialNetwork"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanySocialNetworks = async (): Promise<CompanySocialNetwork[]> => {
	return (await api.get(defaultRoute + "/allCompanySocialNetwork")).data
}

export const findCompanySocialNetworkById = async (id: string): Promise<CompanySocialNetwork> => {
	return (await api.get(defaultRoute + "/getCompanySocialNetwork/" + id)).data
}

export const createCompanySocialNetwork = async (payload: CompanySocialNetwork): Promise<CompanySocialNetwork> => {
	return (await api.post(defaultRoute + "/saveCompanySocialNetwork", payload)).data
}

export const updateCompanySocialNetwork = async (id: string, payload: CompanySocialNetwork): Promise<CompanySocialNetwork> => {
	return (await api.put(defaultRoute + "/editCompanySocialNetwork/" + id, payload)).data
}

export const deleteCompanySocialNetwork = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanySocialNetwork/" + id)).data
}
