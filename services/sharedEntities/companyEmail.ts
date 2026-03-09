import api from "@/lib/api"
import { defaultRoute } from "./defaultRoute"
import { CompanyEmail } from "@/types/services/sharedEntities/companyEmail"

export const findAllCompanyEmails = async (): Promise<CompanyEmail[]> => {
	return (await api.get(defaultRoute + "/allCompanyEmail")).data
}

export const findCompanyEmailById = async (id: string): Promise<CompanyEmail> => {
	return (await api.get(defaultRoute + "/getCompanyEmail/" + id)).data
}

export const createCompanyEmail = async (payload: CompanyEmail): Promise<CompanyEmail> => {
	return (await api.post<CompanyEmail>(defaultRoute + "/saveCompanyEmail", payload)).data
}

export const updateCompanyEmail = async (id: string, payload: CompanyEmail): Promise<CompanyEmail> => {
	return (await api.put<CompanyEmail>(defaultRoute + "/editCompanyEmail/" + id, payload)).data
}

export const deleteCompanyEmail = async (id: string): Promise<void> => {
	await api.delete<CompanyEmail>(defaultRoute + "/deleteCompanyEmail/" + id)
}
