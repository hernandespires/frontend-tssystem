import api from "@/lib/api"
import { CompanyOperations } from "@/types/services/companyAuxiliaries/companyOperations"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyOperations = async (): Promise<CompanyOperations[]> => {
	return (await api.get(defaultRoute + "/allCompanyOperations")).data
}

export const findCompanyOperationsById = async (id: string): Promise<CompanyOperations> => {
	return (await api.get(defaultRoute + "/getCompanyOperations/" + id)).data
}

export const createCompanyOperations = async (payload: CompanyOperations): Promise<CompanyOperations> => {
	return (await api.post(defaultRoute + "/saveCompanyOperations", payload)).data
}

export const updateCompanyOperations = async (id: string, payload: CompanyOperations): Promise<CompanyOperations> => {
	return (await api.put(defaultRoute + "/editCompanyOperations/" + id, payload)).data
}

export const deleteCompanyOperations = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyOperations/" + id)).data
}
