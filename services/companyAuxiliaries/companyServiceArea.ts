import api from "@/lib/api"
import { CompanyServiceArea } from "@/types/services/companyAuxiliaries/companyServiceArea"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyServiceAreas = async (): Promise<CompanyServiceArea[]> => {
	return (await api.get(defaultRoute + "/allCompanyServiceArea")).data
}

export const findCompanyServiceAreaById = async (id: string): Promise<CompanyServiceArea> => {
	return (await api.get(defaultRoute + "/getCompanyServiceArea/" + id)).data
}

export const createCompanyServiceArea = async (payload: CompanyServiceArea): Promise<CompanyServiceArea> => {
	return (await api.post(defaultRoute + "/saveCompanyServiceArea", payload)).data
}

export const updateCompanyServiceArea = async (id: string, payload: CompanyServiceArea): Promise<CompanyServiceArea> => {
	return (await api.put(defaultRoute + "/editCompanyServiceArea/" + id, payload)).data
}

export const deleteCompanyServiceArea = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyServiceArea/" + id)).data
}
