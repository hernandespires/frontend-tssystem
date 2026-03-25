import api from "@/lib/api"
import { CompanyReference } from "@/types/services/companyAuxiliaries/companyReference"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyReferences = async (): Promise<CompanyReference[]> => {
	return (await api.get(defaultRoute + "/allCompanyReference")).data
}

export const findCompanyReferenceById = async (id: string): Promise<CompanyReference> => {
	return (await api.get(defaultRoute + "/getCompanyReference/" + id)).data
}

export const createCompanyReference = async (payload: CompanyReference): Promise<CompanyReference> => {
	return (await api.post(defaultRoute + "/saveCompanyReference", payload)).data
}

export const updateCompanyReference = async (id: string, payload: CompanyReference): Promise<CompanyReference> => {
	return (await api.put(defaultRoute + "/editCompanyReference/" + id, payload)).data
}

export const deleteCompanyReference = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyReference/" + id)).data
}
