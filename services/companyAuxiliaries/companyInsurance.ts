import api from "@/lib/api"
import { CompanyInsurance } from "@/types/services/companyAuxiliaries/companyInsurance"
import { defaultRoute } from "./defaultRoute"

export const findAllCompanyInsurances = async (): Promise<CompanyInsurance[]> => {
	return (await api.get(defaultRoute + "/allCompanyInsurance")).data
}

export const findCompanyInsuranceById = async (id: string): Promise<CompanyInsurance> => {
	return (await api.get(defaultRoute + "/getCompanyInsurance/" + id)).data
}

export const createCompanyInsurance = async (payload: CompanyInsurance): Promise<CompanyInsurance> => {
	return (await api.post(defaultRoute + "/saveCompanyInsurance", payload)).data
}

export const updateCompanyInsurance = async (id: string, payload: CompanyInsurance): Promise<CompanyInsurance> => {
	return (await api.put(defaultRoute + "/editCompanyInsurance/" + id, payload)).data
}

export const deleteCompanyInsurance = async (id: string): Promise<string> => {
	return (await api.delete(defaultRoute + "/deleteCompanyInsurance/" + id)).data
}
