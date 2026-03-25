import api from "@/lib/api"
import { CompanyGMB } from "@/types/services/companyAuxiliaries/companyGMB"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyGMBs = async (): Promise<CompanyGMB[]> => {
	return (await api.get(defaultRoute + "/allCompanyGMB")).data
}

export const findCompanyGMBById = async (id: string): Promise<CompanyGMB> => {
	return (await api.get(defaultRoute + "/getCompanyGMBById/" + id)).data
}

export const createCompanyGMB = async (payload: CompanyGMB): Promise<CompanyGMB> => {
	return (await api.post(defaultRoute + "/saveCompanyGMB", payload)).data
}

export const updateCompanyGMB = async (id: string, payload: CompanyGMB): Promise<CompanyGMB> => {
	return (await api.put(defaultRoute + "/editCompanyGMB/" + id, payload)).data
}

export const deleteCompanyGMB = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyGMB/" + id)).data
}
