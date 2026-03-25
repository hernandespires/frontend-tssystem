import api from "@/lib/api"
import { CompanySite } from "@/types/services/companyAuxiliaries/companySite"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanySites = async (): Promise<CompanySite[]> => {
	return (await api.get(defaultRoute + "/allCompanySite")).data
}

export const findCompanySiteById = async (id: string): Promise<CompanySite> => {
	return (await api.get(defaultRoute + "/getCompanySiteById/" + id)).data
}

export const createCompanySite = async (payload: CompanySite): Promise<CompanySite> => {
	return (await api.post(defaultRoute + "/saveCompanySite", payload)).data
}

export const updateCompanySite = async (id: string, payload: CompanySite): Promise<CompanySite> => {
	return (await api.put(defaultRoute + "/editCompanySite/" + id, payload)).data
}

export const deleteCompanySite = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanySite/" + id)).data
}
