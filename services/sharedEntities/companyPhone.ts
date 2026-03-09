import api from "@/lib/api"
import { CompanyPhone } from "@/types/services/sharedEntities/companyPhone"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyPhones = async (): Promise<CompanyPhone[]> => {
	return (await api.get(defaultRoute + "/allCompanyPhone")).data
}

export const findCompanyPhoneById = async (id: string): Promise<CompanyPhone> => {
	return (await api.get(defaultRoute + "/getCompanyPhone/" + id)).data
}

export const createCompanyPhone = async (payload: CompanyPhone): Promise<CompanyPhone> => {
	return (await api.post<CompanyPhone>(defaultRoute + "/saveCompanyPhone", payload)).data
}

export const updateCompanyPhone = async (id: string, payload: CompanyPhone): Promise<CompanyPhone> => {
	return (await api.put<CompanyPhone>(defaultRoute + "/editCompanyPhone/" + id, payload)).data
}

export const deleteCompanyPhone = async (id: string): Promise<void> => {
	await api.delete<CompanyPhone>(defaultRoute + "/deleteCompanyPhone/" + id)
}
