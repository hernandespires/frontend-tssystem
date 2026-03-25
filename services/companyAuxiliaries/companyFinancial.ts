import api from "@/lib/api"
import { CompanyFinancial } from "@/types/services/companyAuxiliaries/companyFinancial"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyFinancials = async (): Promise<CompanyFinancial[]> => {
	return (await api.get(defaultRoute + "/allCompanyFinancial")).data
}

export const findCompanyFinancialById = async (id: string): Promise<CompanyFinancial> => {
	return (await api.get(defaultRoute + "/getCompanyFinancial/" + id)).data
}

export const createCompanyFinancial = async (payload: CompanyFinancial): Promise<CompanyFinancial> => {
	return (await api.post(defaultRoute + "/saveCompanyFinancial", payload)).data
}

export const updateCompanyFinancial = async (id: string, payload: CompanyFinancial): Promise<CompanyFinancial> => {
	return (await api.put(defaultRoute + "/editCompanyFinancial/" + id, payload)).data
}

export const deleteCompanyFinancial = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyFinancial/" + id)).data
}
