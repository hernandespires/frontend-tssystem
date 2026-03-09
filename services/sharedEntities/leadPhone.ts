import api from "@/lib/api"
import { LeadPhone } from "@/types/services/sharedEntities/leadPhone"
import { defaultRoute } from "./defaultRoute"

export const findAllLeadPhones = async (): Promise<LeadPhone[]> => {
	return (await api.get(defaultRoute + "/allLeadPhone")).data
}

export const findLeadPhoneById = async (id: string): Promise<LeadPhone> => {
	return (await api.get(defaultRoute + "/getLeadPhone/" + id)).data
}

export const createLeadPhone = async (payload: LeadPhone): Promise<LeadPhone> => {
	return (await api.post<LeadPhone>(defaultRoute + "/saveLeadPhone", payload)).data
}

export const updateLeadPhone = async (id: string, payload: LeadPhone): Promise<LeadPhone> => {
	return (await api.put<LeadPhone>(defaultRoute + "/editLeadPhone/" + id, payload)).data
}

export const deleteLeadPhone = async (id: string): Promise<void> => {
	await api.delete<LeadPhone>(defaultRoute + "/deleteLeadPhone/" + id)
}
