import api from "@/lib/api"
import { Lead } from "@/types/services/comercial/lead"
import { defaultRoute } from "./defaultRoute"

export const findAllLeads = async (): Promise<Lead[]> => {
	return (await api.get(defaultRoute + "/allLead")).data
}

export const findLeadById = async (id: string): Promise<Lead> => {
	return (await api.get(defaultRoute + "/getLead/" + id)).data
}

export const createLead = async (payload: Lead): Promise<Lead> => {
	return (await api.post(defaultRoute + "/saveLead", payload)).data
}

export const updateLead = async (id: string, payload: Lead): Promise<Lead> => {
	return (await api.put(defaultRoute + "/editLead/" + id, payload)).data
}

export const deleteLead = async (id: string): Promise<void> => {
	await api.delete(defaultRoute + "/deleteLead/" + id)
}
