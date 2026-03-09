import api from "@/lib/api"
import { LeadEmail } from "@/types/services/sharedEntities/leadEmail"
import { defaultRoute } from "./defaultRoute"

export const findAllLeadEmails = async (): Promise<LeadEmail[]> => {
	return (await api.get(defaultRoute + "/allLeadEmail")).data
}

export const findLeadEmailById = async (id: string): Promise<LeadEmail> => {
	return (await api.get(defaultRoute + "/getLeadEmail/" + id)).data
}

export const createLeadEmail = async (payload: LeadEmail): Promise<LeadEmail> => {
	return (await api.post<LeadEmail>(defaultRoute + "/saveLeadEmail", payload)).data
}

export const updateLeadEmail = async (id: string, payload: LeadEmail): Promise<LeadEmail> => {
	return (await api.put<LeadEmail>(defaultRoute + "/editLeadEmail/" + id, payload)).data
}

export const deleteLeadEmail = async (id: string): Promise<void> => {
	await api.delete<LeadEmail>(defaultRoute + "/deleteLeadEmail/" + id)
}
